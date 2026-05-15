   import java.awt.AWTException;
   import java.awt.Robot;
   import java.awt.Rectangle;
   import java.awt.Toolkit;
   import java.awt.image.BufferedImage;
   import java.io.*;
   import javax.imageio.ImageIO;
   import java.awt.*;
   import java.applet.*;
   import java.util.*;

    public class ScreenCapture4 extends Applet
   {
       public boolean CaptureScreen(String path, String filename)
      {
         try
         {
         // capture the whole screen
            BufferedImage screencapture = new Robot().createScreenCapture(new Rectangle(Toolkit.getDefaultToolkit().getScreenSize()) );
         
         // Create the directory specified if it doesn't already exist
            path = path + "/";
            File dir = new File(path);
            dir.mkdirs();
         // Save as JPEG
         //File file = new File("screencapture.jpg");
            File file = new File(path + filename);
            ImageIO.write(screencapture, "jpg", file);
         
         // Save as PNG
         // File file = new File("screencapture.png");
         // ImageIO.write(screencapture, "png", file);
            return true;
         }
             catch(Exception hoshizakinozomi)
            {
               return false;
            }
      }
   	
       public void sayHello() {
         Graphics g = getGraphics();
         g.drawString("Hello from JAWA!", 10, 10);
      }
   	
       public boolean WriteText(String a, String thefilename)
      {
         try
         {
         	// Fear my poorly documented code
            File f = new File(thefilename);
            // Don't think we need this, but since it's already in, it stays
         	// because I said so
            BufferedReader reader = new BufferedReader(new FileReader(f));
            // This line allows appending to a text file rather than overwriting what is already stored
         	// This stumped me for quite a while. Those java bastards D=
            BufferedWriter writer = new BufferedWriter(new FileWriter(f,true));
            PrintWriter pw = new PrintWriter(writer);
            String line = null;
            if((line = reader.readLine()) != null)
            {
               if((line = reader.readLine()) != a)
               {
               //writer.newLine();
                  pw.println(a);
                  pw.close();
               }
            }
            else
            {
               if((line = reader.readLine()) != a)
               {
                  pw.println(a);
                  pw.close();
               }
            }
            return true;
         }
             catch(Exception reimuxmarisa)
            {
               return false;
            }
      }
      
       public boolean FlushFileList(String thefilename)
      {
      // Just in case I get complains about me not commenting my code
      // This function flushes the text file
         try
         {
            File readfile = new File(thefilename);
            BufferedReader br = new BufferedReader(new FileReader(readfile));
            PrintWriter pw = new PrintWriter(new FileWriter(readfile));
            String line2 = null;
            while((line2 = br.readLine()) != null)
            {
               pw.println("");
               pw.flush();
            }
            pw.close();
            br.close();
            return true;
         }
             catch(Exception yukaloveskakeru)
            {
               return false;
            }
      }
   	
       public String ReadText(String filename, String returntext, int indextoreadfrom)
      {
         IllegalArgumentException misuzusenpai = new IllegalArgumentException();
         File readfile = new File(filename);
         if((filename == null || filename == ""))
         {
            throw misuzusenpai;
         }
         
         String line;
         ArrayList screenshots = new ArrayList();
         try
         {
            BufferedReader in = new BufferedReader(new FileReader(filename));
            if(!in.ready())
            {
               throw new IOException();
            }
            while((line = in.readLine()) != null)
            {
               screenshots.add(line);
            }
            in.close();
         }
             catch(IOException nozomikodamaortsubasa)
            {
               System.out.println(nozomikodamaortsubasa);
               return null;	
            }
      	// Destroy duplicates inside the array list
         HashSet hashedset = new HashSet(screenshots);
         ArrayList sortedshots = new ArrayList(hashedset);
         // Sorts the array if it's not in order to begin with
         Collections.sort(sortedshots);
         Object blahblah = sortedshots.get(indextoreadfrom);
         return blahblah.toString();
      }
   
   }