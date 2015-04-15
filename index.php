<html>
<head>
	<meta charset="utf-8">
	<title>A Simple Page with CKEditor</title>
	<!-- Make sure the path to CKEditor is correct. -->	
	<script src="ckeditor/ckeditor.js"></script>
	<script src="jquery.min.js"></script>
</head>

<body>
<style>
.highlight{
	background-color: #FFFF00;
}
</style>

<script>
$(function() {
	//hide form for first time
	$('#form1').hide();
	//Show form
	$("#b_editor").click(function() {
		if($(this).html() == 'show') {
			CKEDITOR.replace( 'editor1',{
				extraPlugins: 'rich',
				skin: 'moononew',
				allowedContent: true
			});
			$('#form1').show();
			$(this).html('hide');
		} else {
			CKEDITOR.instances['editor1'].destroy();
			$('#form1').hide();
			$(this).html('show');
		}
	});
	//highlight rich tag
	$("rich").each(function(){
		var at = "";
		var isClass = false;
		$.each(this.attributes, function() {
			if(this.name == "class") {
				at += this.name+'="'+this.value+' highlight" ';
				isClass = true; 
			} else {			
				at += this.name+'="'+this.value+'" ';
			}
		});
		if (!isClass) {
			at += 'class="highlight"';
		}
        $(this).replaceWith('<span '+$.trim(at)+'>'+$(this).html()+'</span>');
    });
});
</script>
<?php
	//get data from db
	$link_identifier = mysql_connect('localhost', 'test', 'test'); 
    mysql_set_charset('utf8',$link_identifier); 
    mysql_select_db('test', $link_identifier); 
	$query = "select * from data";
	$result = mysql_query($query);
	$data = "";
	while($row = mysql_fetch_array($result)) {
		$data = $row["text"];
	}
?>
	<div>
		<?php echo $data; ?>
		</br>
		<form id="form1" method="POST" action="post.php">
			<textarea name="editor1" id="editor1" rows="10" cols="80">
                <?php echo $data; ?>
			</textarea>
			<input type="submit" />
		</form>
	</div>
	<button id="b_editor" name="b_editor">show</button>
</body>
</html>