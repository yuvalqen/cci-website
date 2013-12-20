jQuery(document).ready(function() {
  //clean up empty tags
  jQuery('.google-form-wrapper p, .google-form-wrapper br')
    .filter(function() {
      return jQuery(this).html() == '';
    })
    .remove();
  
  //add required class to required elements
  jQuery('.google-form-wrapper form')
    .find('.ss-item-required input, .ss-item-required textarea')
    .filter(function() {
      return jQuery(this).attr('name').match(/entry\.\d\.single/);
    })
    .addClass('required');
 
  //validate the form
  jQuery('.google-form-wrapper form').validate({
    submitHandler: function(form) {
      jQuery(form)
        .ajaxSubmit({
          success: function(data) {
            if (data) {
                jQuery('.thank_you_pane').fadeIn('slow');
            }
          },
          error : function (data) {
            // We usually end up with a Access Control Allow Origin error, so we handle failure as success as well.
            jQuery('.thank_you_pane').fadeIn('slow');
            console.error(data);
          }
        })
    }
  });
});