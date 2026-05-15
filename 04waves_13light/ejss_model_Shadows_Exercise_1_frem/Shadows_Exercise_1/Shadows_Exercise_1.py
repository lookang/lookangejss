#
# Shadows_Exercise_1.py
#
# A point source is located a specified distance from
# a rectangular aperture that is centered on the origin.
# A screen is located a specified distance from 
# the aperture.
#
# This file will generate a filled contour plot of 
# the irradiance of the light reaching the screen 
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
from pylab import xlabel,ylabel,show,contourf,axis,colorbar,figure,title,xlim,ylim
from matplotlib import cm

# import the command needed to make a 1D array
from numpy import meshgrid,absolute,where,zeros,linspace

# inputs
zs = -20.0 # distance between the source and aperture [cm]
zsc = 40.0 # distance between the screen and aperture [cm]
rso = [5.0,0.0] # (x,y) location of the source [cm,cm]
ap_width = 4.0 # aperture width [cm]
ap_height = 3.0 # aperture height [cm]
screen_width = 60.0 # screen width [cm]
screen_height = 60.0 # wcreen height [cm]
nw = 240 # Number of screen width intervals
nh = 240 # Number of screen height intervals

# initialize needed arrays to zero
screen_x = zeros((nw+1,nh+1)) # x coordinates of screen points
screen_y = zeros((nw+1,nh+1)) # y coordinates of screen points
rsq = zeros((nw+1,nh+1)) # source-to-screen point distance, squared
x0 = zeros((nw+1,nh+1)) # x coordinates of ray intercepts at aperture plane
y0 = zeros((nw+1,nh+1)) # y coordinates of ray intercepts at aperture plane

# initialize values
screen_xx = linspace(-0.5*screen_width,0.5*screen_width,nw+1)
screen_yy = linspace(-0.5*screen_height,0.5*screen_height,nh+1)

# create the meshgrid on which to evaluate the irradiance
screen_xx, screen_yy = meshgrid(screen_xx,screen_yy)

# Calculate grid increments
deltaw = screen_width/nw # grid increment, width [cm]
deltah = screen_height/nh # grid increment, height [cm]

# Define the array of screen x and screen y values
for i in range (0,nw+1):
    for j in range (0,nh+1):
        screen_x[i,j] = -0.5*screen_width + deltaw*i
        screen_y[i,j] = -0.5*screen_height + deltah*j
        
# Calculate the intensity at each screen point
for i in range (0,nw+1):
    for j in range (0,nh+1):
        # First calculate the square of the distance from source to screen
        rsq = (screen_x[i,j]-rso[0])**2 + (screen_y[i,j]-rso[1])**2 + (zsc - zs)**2
        # Calculate x and y coordinates at the aperture
        x0[i,j] = rso[0] + abs(zs)*(screen_x[i,j] - rso[0])/(zsc - zs)
        y0[i,j] = rso[1] + abs(zs)*(screen_y[i,j] - rso[1])/(zsc - zs)

# Check if the coordinates fall within the aperture
maskx = where(absolute(x0) < 0.5*ap_width,1.0,0.0)
masky = where(absolute(y0) < 0.5*ap_height,1.0,0.0)

# Calculate the intensity
irradiance = maskx*masky/rsq
    
# make a filled contour plot of the period vs overlap and length ratios
figure()
contourf(screen_yy,screen_xx,irradiance,100,cmap=cm.bone)
axis('equal')
xlim(-0.5*screen_width,0.5*screen_width)
ylim(-0.5*screen_height,0.5*screen_height)
xlabel("$x$ [cm]",size = 16)
ylabel("$y$ [cm]",size = 16)
title('Illumination pattern: $w = $%s cm, $h = $%s'%(ap_width,ap_height),size = 16)
colorbar().set_label(label='Irradiance [arb. units]',size=16)
show()