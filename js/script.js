$(document).ready(function() {
  $("label div").removeClass();
  $('.contact').click(function() {
    event.preventDefault();
    $('#contact_form').css({
      'display': 'block',
      'opacity': '0'
    }).animate({
      'opacity': '1',
      'top': '100'
    }, 400);
  });
  $("#closeForm").click(function(event) {
    event.preventDefault();
    $('#contact_form').animate({
      'opacity': '0',
      'top': '-100'
    }, 400);
  });
  var $window = $(window),
    $document = $(document),
    contact_form = $('#contact_form2');
  contact_form.css({
    opacity: 0
  });
  $('#contact_form2').css('display', 'none');
  $window.on('scroll', function() {
    if (($window.scrollTop() + $window.height()) == $document.height()) {
      $('#contact_form2').css('display', 'block');
      contact_form.stop(true).animate({
        opacity: 1
      }, 250);
    } else {
      contact_form.stop(true).animate({
        opacity: 0
      }, 250);
    }
  });
  $("#closeForm2").click(function(event) {
    event.preventDefault();
    $("#contact_form2").hide();
  });
  // ------mientras no esta funcionando el demo
  $("#showDemo").click(function(event) {
    event.preventDefault();
    contact_form.css({
      opacity: 1
    });
    $('#contact_form2').css('display', 'block');
    window.open('http://www.gofind.ai/', '_blank');
  });
  // ------------------------
  $("#showSchedule").click(function(event) {
    event.preventDefault();
    contact_form.css({
      opacity: 1
    });
    $('#contact_form2').css('display', 'block');
  });
  // services effects
  $(function() {
    var $window = $(window),
      win_height_padded = $window.height() * 1.1,
      isTouch = Modernizr.touch;
    if (isTouch) {
      $('.revealOnScroll').addClass('animated');
    }
    $window.on('scroll', revealOnScroll);

    function revealOnScroll() {
      var scrolled = $window.scrollTop(),
        win_height_padded = $window.height() * 1.1;
      // Showed...
      $(".revealOnScroll:not(.animated)").each(function() {
        var $this = $(this),
          offsetTop = $this.offset().top;
        if (scrolled + win_height_padded > offsetTop) {
          if ($this.data('timeout')) {
            window.setTimeout(function() {
              $this.addClass('animated ' + $this.data('animation'));
            }, parseInt($this.data('timeout'), 10));
          } else {
            $this.addClass('animated ' + $this.data('animation'));
          }
        }
      });
      // Hidden...
      $(".revealOnScroll.animated").each(function(index) {
        var $this = $(this),
          offsetTop = $this.offset().top;
        if (scrolled + win_height_padded < offsetTop) {
          $(this).removeClass('animated fadeInUp flipInX lightSpeedIn')
        }
      });
    }
    revealOnScroll();
  });
  // forms
  $("#submit_btn").click(function() {
    var proceed = true;
    $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function() {
      $(this).css('border-color', '');
      if (!$.trim($(this).val())) { //if this field is empty 
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag        
      }
    });
    if (proceed) {
      //get input field values data to be sent to server
      post_data = {
        'user_name': $('input[name=name]').val(),
        'user_email': $('input[name=email]').val(),
        'user_website': $('input[name=website]').val(),
        'msg': $('textarea[name=message]').val()
      };
      //Ajax post data to server
      $.post('indexForm.php', post_data, function(response) {
        if (response.type == 'error') { //load json data from server and output message     
          output = '<div class="error">' + response.text + '</div>';
        } else {
          output = '<div class="success">' + response.text + '</div>';
          //reset values in all input fields
          $("#contact_form  input[required=true], #contact_form textarea[required=true]").val('');
          $("#contact_form #contact_body").slideUp(); //hide form after success
        }
        $("#contact_form #contact_results").hide().html(output).slideDown();
      }, 'json');
    }
  });
  //reset previously set border colors and hide all message on .keyup()
  $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() {
    $(this).css('border-color', '');
    $("#result").slideUp();
  });
  $("#submit_btn2").click(function() {
    var proceed = true;
    $("#contact_form2 input[required=true], #contact_form2 textarea[required=true]").each(function() {
      $(this).css('border-color', '');
      if (!$.trim($(this).val())) { //if this field is empty 
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag        
      }
    });
    if (proceed) {
      //get input field values data to be sent to server
      post_data = {
        'user_name': $('input[name=name2]').val(),
        'user_email': $('input[name=email2]').val(),
        'user_website': $('input[name=website2]').val(),
        'msg': $('textarea[name=message2]').val()
      };
      //Ajax post data to server
      $.post('indexForm.php', post_data, function(response) {
        if (response.type == 'error') { //load json data from server and output message     
          output = '<div class="error">' + response.text + '</div>';
        } else {
          output = '<div class="success">' + response.text + '</div>';
          //reset values in all input fields
          $("#contact_form2  input[required=true], #contact_form2 textarea[required=true]").val('');
          $("#contact_form2 #contact_body2").slideUp(); //hide form after success
        }
        $("#contact_form2 #contact_results2").hide().html(output).slideDown();
      }, 'json');
    }
  });
  //reset previously set border colors and hide all message on .keyup()
  $("#contact_form2  input[required=true], #contact_form2 textarea[required=true]").keyup(function() {
    $(this).css('border-color', '');
    $("#result2").slideUp();
  });
});