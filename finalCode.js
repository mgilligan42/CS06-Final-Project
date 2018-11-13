// JavaScript File
$(document).ready(function(){
                var current;
                $.ajax({
                        type : 'GET',
                        url : 'content.xml',
                        dataType: 'xml',
                        success: function(result){
                          $(result).find('house').each(function(){
                              var house = $(this).attr('name');
                              $(this).find('announcement').each(function(){
                                var content = $(this).find('text').text();
                                var date = $(this).find('date').text();
                                
                                var node = "<li><span class='content'>"+content+"</span><span style='color:gray'> "+date+"</span></li>";
                                
                                if (house=='Gryffindor'){
                                  $('#gryff').append(node);
                                }
                                if (house=='Hufflepuff'){
                                  $('#puff').append(node);
                                  //$('#puff').children().last().append(datelink);
                                }
                                if (house=='Ravenclaw'){
                                  $('#raven').append(node);
                                  //$('#raven').children().last().append(datelink);
                                }
                                if (house=='Slytherin'){
                                  $('#snake').append(node);
                                  //$('#snake').children().last().append(datelink);
                                }
                              });//end announcement.each
                            });//end house.each
                        }, //end success
                        error: function(){
                          alert("Something went wrong");   
                        }
                }); //end ajax
                
                $('button').click(function(){
                    if ($(this).attr('id')=='login'){
                            for(var x=0; x<users.length; x++){
                              if($('#username').val()==users[x].username && $('#password').val()==users[x].password){
                                var node = "<span class='glyphicon glyphicon-remove' style='color:red'></span><span class='glyphicon glyphicon-pencil' style='color:black'></span>";
                                $('.editme').children().prepend(node);
                                var node2 = "<span class='glyphicon glyphicon-plus' style='color:black'></span>";
                                $('.panel-title').append(node2);
                                $('#loginform').hide();
                                $('.navbar-right').children().prepend("<button class='btn btn-default' id='logout'>Logout</button>");
                              }
                            }
                            $('#username').val("");
                            $('#password').val("");
                    }// end login button
                    if ($(this).attr('id')=='edit-Submit'){
                      var test = $('#editA').val();
                      var d = new Date();
                      var d2 = d.toString();
                      var d3 = d2.substr(4, 11);
                      //var node = $('<li></li>');
                      var node3 = "<li><span class='glyphicon glyphicon-remove' style='color:red'></span><span class='glyphicon glyphicon-pencil' style='color:black'></span><span class='content'>"+test+"</span><span style='color:gray'>  "+d3+"</span></li>";
                      
                      if (current=='gryff'){
                        //alert("it worked");
                        $('#gryff').prepend(node3);
                      }else if (current=='puff'){
                        $('#puff').prepend(node3);
                      }else if (current=='raven'){
                        $('#raven').prepend(node3);
                      }else if (current=='snake'){
                        $('#snake').prepend(node3);
                      } else {
                        $('body').find('.content').each(function(){
                          if($(this).html()==current){
                            $(this).html(test);
                          }
                        });//end find .content each
                      }
                      $('#editA').val("");
                    }
                });//end button click
                
                $('body').on('click', '.glyphicon-remove', function(){
                    $(this).parent().remove();
                });// end on click glyphicon remove
                
                $('body').on('click', '.glyphicon-pencil', function(){
                    current = $(this).next().html();
                    var now = $(this).next().html();
                    var modal = $('#editModal');
                      modal.find('#editA').val(now);
                    $('#editModal').modal();
                    
                }); //end on click glypicon pencil
                        
                $('body').on('click', '.glyphicon-plus', function(){
                  current = $(this).parent().parent().next().children().attr('id');
                  //alert(current);
                  var modal = $('#editModal');
                    modal.find('.modal-title').text('New Announcement');
                  $('#editModal').modal();
                });//end on click glyphicon plus
                
                $('body').on('click', '#logout', function(){
                    //var loginbutton = "<button type='button' class='btn btn-primary' data-toggle='modal' data-target='#myModal' id='loginform'>Login</button>";
                    $('.glyphicon').remove();
                    $('#logout').remove();
                    $('#loginform').show();
                });// end on click logout
                
                
                
            });//end document.ready