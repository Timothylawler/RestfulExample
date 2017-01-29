$(document).ready(function(){
	var self = this;
	
	
	getAllPosts();
	
	function getAllPosts(){
		$.ajax({
			url: "http://localhost:3000/posts/all",
			dataType: "json",
			type: "GET",
			success: function(data){
				addPostsToDocument(data);
			},
			error: function(data){
				
			}
		});
	}
	
	function deletePost(){
		
	}
	
	function createPost(text, name, city){
		$.ajax({
			url: "http://localhost:3000/posts/create",
			dataType: "json",
			type: "PUT",
			data: {"text": text, "name": name, "city": city},
			success: function(data){
				$("#post-modal").modal('hide');
				getAllPosts();
			},
			error: function(data){
				
			}
		})
	}
	
	function addPostsToDocument(data){
		console.log(data);
		document.getElementById("guest-book-wrapper").innerHTML = "";
		for(var i = 0; i< data.length; i++){
			//	get data
			var id = data[i].ID;
			var city = data[i].city;
			var name = data[i].name;
			var post = data[i].post;
			
			console.log(id,city,name,post);
			
			// display data
			var postEntry = document.createElement("div");
			postEntry.setAttribute("class", "post col-md-6 col-md-offset-3 contrast z-3");
			postEntry.setAttribute("id", id);
			
			var postRow = document.createElement("div");
			postRow.setAttribute("class", "row");
			
			var postText = document.createElement("div");
			postText.setAttribute("class", "text col-md-12 padding-18 no-pad-bot");
			postText.innerHTML = post;
			
			var postLine = document.createElement("HR");
			
			//	Add text and line to row
			postText.appendChild(postLine);
			postRow.appendChild(postText);
			
			
			var postAlternative = document.createElement("div");
			postAlternative.setAttribute("class", "contrast-alternative padding-4 col-md-12");
			
			var postAlternativeName = document.createElement("div");
			postAlternativeName.setAttribute("class", "col-md-6 text center");
			postAlternativeName.innerHTML = name;
			var postAlternativeCity = document.createElement("div");
			postAlternativeCity.setAttribute("class", "col-md-6 text center");
			postAlternativeCity.innerHTML = city;
			
			//	Add name and city to post alternative
			postAlternative.appendChild(postAlternativeName);
			postAlternative.appendChild(postAlternativeCity);
			
			//	Add post alternative to row
			postRow.appendChild(postAlternative);
			
			//	Add row to postEntry and postEntry to document
			postEntry.appendChild(postRow);
			
			
			$("#guest-book-wrapper").append(postEntry);
		}
	}
	
	$("#post-modal-post-btn").click(function(){
		//	Get data
		var text = document.getElementById("modal-text").value;
		var name = document.getElementById("modal-name").value;
		var city = document.getElementById("modal-city").value;
		
		createPost(text, name, city);
		
	});
	
});



