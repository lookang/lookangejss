#
# Shadows_Exercise_2.py
#
# A linear array of N point sources located a specified distance from
# a rectangular aperture that is centered on the origin.
# A screen is located a specified distance from 
# the aperture.
#
# This file will generate a filled contour plot of 
# the irradiance of light reaching the screen 
# versus lateral coordinates (x,y) 
#
# Written by:
#
# Ernest R. Behringer
# Department of Physics and Astronomy
# Eastern Michigan University
# Ypsilanti, MI 48197
# (734) 487-8799
# ebehringe@emich.edu
#
# 20160112-13 original code by ERB
# 20160609 clean up by ERB
#

# import the commands needed to make the plot
from pylab import xlabel,ylabel,xlim,ylim,axis,show,contourf,colorbar,figure,title
from matplotlib import cm

# import the command needed to make a 1D array
from numpy import meshgrid,absolute,where,zeros,linspace

# inputs
zs = -20.0 # distance between the source and aperture [cm]
zsc = 40.0 # distance between the screen and aperture [cm]
nso = 3 # number of point sources
length_so = 4.0 # length of the array of point sources [cm]
ap_width = 4.0 # aperture width [cm]
ap_height = 3.0 # aperture height [cm]
screen_width = 60.0 # screen width [cm]
screen_height = 60.0 # wcreen height [cm]
nw = 240 # Number of screen width intervals
nh = 240 # Number of screen height intervals

# initialize needed arrays to zero
rso = zeros((nso,2)) # (x,y) source positions [cm,cm]
screen_x = zeros((nw+1,nh+1)) # x-coordinates of screen points
screen_y = zeros((nw+1,nh+1)) # y-coordinates of screen points
rsq = zeros((nw+1,nh+1)) # r squared values
irradiance = zeros((nw+1,nh+1)) # irradiance values
x0 = zeros((nw+1,nh+1)) # x-coordinates of intersections at aperture plane
y0 = zeros((nw+1,nh+1)) # y-coordinates of intersections at aperture plane

# create 1D arrays to create a meshgrid for contour plotting
screen_xx = linspace(-0.5*screen_width,0.5*screen_width,nw+1)
screen_yy = linspace(-0.5*screen_height,0.5*screen_height,nh+1)
# generate the meshgrid of screen points
screen_xx, screen_yy = meshgrid(screen_xx,screen_yy)

# Set up point source coordinates
# Here, the sources are arranged 
for i in range (0,nso):
    for j in range (0,2):
        if j==0:
            rso[i,j] = -0.5*length_so + i*length_so/(nso-1)
        else: # j = 1 and the y-coordinate is
            rso[i,j] = 0.0
         
# Calculate grid increments
deltaw = screen_width/nw # grid increment, width [cm]
deltah = screen_height/nh # grid increment, height [cm]

# Define the array of screen x and screen y values
for i in range (0,nw+1):
    for j in range (0,nh+1):
        screen_x[i,j] = -0.5*screen_width + deltaw*i
        screen_y[i,j] = -0.5*screen_height + deltah*j
        
# Calculate the irradiance at each screen point
for k in range (0,nso):
    for i in range (0,nw+1):
        for j in range (0,nh+1):
            # First calculate square of distance from source to screen
            rsq = (screen_x[i,j]-rso[k,0])**2 + (screen_y[i,j]-rso[k,1])**2 + (zsc - zs)**2
            # Calculate x and y coordinates at the aperture
            x0[i,j] = rso[k,0] + abs(zs)*(screen_x[i,j] - rso[k,0])/(zsc - zs)
            y0[i,j] = rso[k,1] + abs(zs)*(screen_y[i,j] - rso[k,1])/(zsc - zs)

    # Check if the coordinates fall within the aperture
    maskx = where(absolute(x0) < 0.5*ap_width,1.0,0.0)
    masky = where(absolute(y0) < 0.5*ap_height,1.0,0.0)

    # Calculate the irradiance (note that we are accumulating irradiance)
    irradiance = irradiance + maskx*masky/rsq
    
# make a filled contour plot of the period vs overlap and length ratios
figure()
contourf(screen_yy,screen_xx,irradiance,100,cmap=cm.bone)
title('Illumination pattern: $w = $%s cm, $h = $%s; $N = $%d'%(ap_width,ap_height,nso))
axis('equal')
xlim(-0.5*screen_width,0.5*screen_width)
ylim(-0.5*screen_height,0.5*screen_height)
xlabel("$x$ [cm]")
ylabel("$y$ [cm]")
colorbar().set_label(label='Irradiance [arb. units]',size=16)
show()