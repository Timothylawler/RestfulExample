/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package laboration4del4;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 *
 * @author timothy
 */
public class Laboration4Del4 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        APIHandler api = new APIHandler();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        while(true){
            
            System.out.println("----- RESTING ADMINISTRATOR -----");
            System.out.println("-- CHOSE ONE ALTERNATIVE --");
            System.out.println("-- 1: LIST ALL POSTS --");
            System.out.println("-- 2 ID: LIST POST WITH ID --");
            System.out.println("-- 3 ID,TEXT,CITY,NAME: UPDATE POST WITH ID --");
            System.out.println("-- 4 TEXT,CITY,NAME: CREATE POST --");
            System.out.println("-- 5 ID: DELETE POST WITH ID --");
            System.out.println("-- 0 EXIT --");
            
            try {   
                String input = br.readLine();
                handleInput(input, api);
            } catch (IOException ex) {
                Logger.getLogger(Laboration4Del4.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    private static void handleInput(String input, APIHandler api) {
        String[] splitput = input.split(" ", 2);
        switch(splitput[0]){
            case "1":
                //  READ
                System.out.println(api.getAll());
                break;
            case "2":
                //  READ
                if(splitput.length == 2){
                    System.out.println(api.get(Integer.valueOf(splitput[1])));
                } else{
                    System.out.println("FALSE ID");
                }
                break;
            case "3":
                //  UPDATE
                if(splitput.length == 2){
                    String[] params = splitput[1].split(",");
                    if(params.length == 4){
                        if(api.updatePost(Integer.valueOf(params[0])
                                , params[1], params[2], params[3])){
                            System.out.println("-- Successfully updated post");
                        } else{
                            System.out.println("-- Error updating post.. Try again");
                        }
                    }else{
                        System.out.println("FALSE ID,TEXT,CITY,NAME");
                    }
                }
                break;
            case "4":
                //  CREATE
                if(splitput.length == 2){
                    String[] params = splitput[1].split(",");
                    if(params.length == 3){
                        if(api.create(params[0], params[1], params[2])){
                            System.out.println("-- Successfully created post");
                        } else{
                            System.out.println("-- Error creating post.. Try again");
                        }
                    }else{
                        System.out.println("FALSE TEXT,CITY,NAME");
                    }
                }
                break;
            case "5":
                //  DELETE
                if(splitput.length == 2){
                    if(api.deletePost(Integer.valueOf(splitput[1]))){
                        System.out.println("Succesfully deleted entry " + splitput[1]);
                    }else{
                        System.out.println("Could not delete entry " + splitput[1]);
                    }
                } else{
                    System.out.println("FALSE ID");
                }
                break;
            case "0":
                System.exit(0);
                break;
            default:
                System.out.println("Enter a number, one space must follow 2,3 and 4");
            
        }
    }
    
}
