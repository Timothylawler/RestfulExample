/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package laboration4del4;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

/**
 *
 * @author timothy
 */
public class APIHandler {
    
    private String base = "http://localhost:3000";
    private HttpURLConnection conn;
    
    public APIHandler(){
        
    }
    
    /**
     * Get all posts from the api
     * @return String with all entries from the api
     */
    public String getAll(){
        return getPost("/posts/all");
    }
    
    /**
     * Get a post specified by id
     * @param id Post ID
     * @return String with the post corresponding to the id
     */
    public String get(int id){
        return getPost("/posts/" + id);
    }
    
    public boolean create(String text, String city, String name){
        try{
            URL url = new URL(base + "/posts/create");
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("PUT");
            conn.setDoOutput(true);
             conn.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");
            
            // Create the form content
            OutputStream out = conn.getOutputStream();
            Writer writer = new OutputStreamWriter(out, "UTF-8");
            
            writer.write("text");
            writer.write("=");
            writer.write(URLEncoder.encode(text, "UTF-8"));
            writer.write("&");
            
            writer.write("name");
            writer.write("=");
            writer.write(URLEncoder.encode(name, "UTF-8"));
            writer.write("&");
            
            writer.write("city");
            writer.write("=");
            writer.write(URLEncoder.encode(city, "UTF-8"));
            writer.write("&");
            
            writer.close();
            out.close();            
            
            if(conn.getResponseCode() != 200){
                throw new IOException(conn.getResponseMessage());
            }
            
            conn.disconnect();
            return true;
        } catch (MalformedURLException ex) {

        } catch (IOException ex){
            
        }
        return false;
    }
    
    /**
     * Delete the post specified by ID
     * @param id    The post ID
     * @return True if succesful delete, else false
     */
    public boolean deletePost(int id){
        
        try{
            URL url = new URL(base + "/posts/" + id);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("DELETE");
            
            if(conn.getResponseCode() != 200){
                throw new IOException(conn.getResponseMessage());
            }
            
            conn.disconnect();
            return true;
        } catch (MalformedURLException ex) {

        } catch (IOException ex){
            
        }
        
        return false;
    }
    
    public boolean updatePost(int id, String text, String city, String name){
        try{
            URL url = new URL(base + "/posts/update");
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
             conn.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");
            
            // Create the form content
            OutputStream out = conn.getOutputStream();
            Writer writer = new OutputStreamWriter(out, "UTF-8");
            
            writer.write("id");
            writer.write("=");
            writer.write(URLEncoder.encode(Integer.toString(id), "UTF-8"));
            writer.write("&");
            
            writer.write("text");
            writer.write("=");
            writer.write(URLEncoder.encode(text, "UTF-8"));
            writer.write("&");
            
            writer.write("name");
            writer.write("=");
            writer.write(URLEncoder.encode(name, "UTF-8"));
            writer.write("&");
            
            writer.write("city");
            writer.write("=");
            writer.write(URLEncoder.encode(city, "UTF-8"));
            writer.write("&");
            
            writer.close();
            out.close();            
            
            if(conn.getResponseCode() != 200){
                throw new IOException(conn.getResponseMessage());
            }
            
            conn.disconnect();
            return true;
        } catch (MalformedURLException ex) {

        } catch (IOException ex){
            
        }
        
        return false;
    }
    
    private String getPost(String route){
        try {
            URL url = new URL(base + route);
            
            conn = (HttpURLConnection) url.openConnection();
            
            if(conn.getResponseCode() != 200)
                throw new IOException(conn.getResponseMessage());
            
            
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while((line = reader.readLine()) != null)
                sb.append(line);
            
            reader.close();
            conn.disconnect();
            
            return sb.toString();
        } catch (MalformedURLException ex) {

        } catch (IOException ex){
            
        }
        return "Error fetching from " + route;
    }
    
}
