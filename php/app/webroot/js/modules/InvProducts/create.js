/* (c)Bittion | Created: 18/09/2014 | Developer:reyro | JS: InvProducts/create */
jQuery(document).ready(function () {
//START SCRIPT
//************************************** EXEC MAIN - START **************************************
//    Created: 18/09/2014 | Developer: reyro | Description: Validates Create Form
    jQuery("#InvProductCreateForm").validate({
        onkeyup: false, //avoid requesting ajax every time keyup, only activates on blur and on submit
        submitHandler: function (form) {
            //Replace form submit for:
            fnCreate();
        },
        // Rules for form validation
        rules: {
            'data[InvPrice][0][price]': {
                required: true,
                number: true
            }
        },
        // Messages for form validation
        messages: {
        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    
    jQuery('#InvProductCategory').focus();
//************************************** EXEC MAIN - END **************************************

//    Created: 18/09/2014 | Developer: reyro | Request:Ajax 
    function fnCreate() {
        jQuery.ajax({
            type: 'POST',
            url: bittionUrlProjectAndController + 'fnCreate',
//            async: false,
            dataType: 'json',
            data: {
                data: jQuery('#InvProductCreateForm').bittionSerializeObjectJson()
            },
            success: function (response) {
                if (response['status'] === 'SUCCESS') {
                    bittionShowGrowlMessage(response['status'], response['title'], response['content']);
                    fillAutoComplete(response['data']['categories'], 'listCategory');
                    fillAutoComplete(response['data']['brands'], 'listBrand');
                    fillAutoComplete(response['data']['types'], 'listType');
                    jQuery("#InvProductCreateForm").get(0).reset();
                } else {
                    bittionShowGrowlMessage(response['status'], response['title'], response['content']);
                }
            },
            error: function (response, status, error) {
                bittionAjaxErrorHandler(response, status, error);
            }
        });
    }

//    Created: 18/09/2014 | Developer: reyro 
    function fillAutoComplete(data, id) {
        var autocomplete = jQuery('#' + id);
        //empty current autocomplete values
        autocomplete.empty();
        //put an empty/message choice
        autocomplete.append('<option value="" disabled="disabled" autocompleteed="autocompleteed">Elija un controlador</option>');
        //fill the autocomplete with new data  
        $.each(data, function (index, value) {
            autocomplete.append('<option value="'
                    + index
                    + '">'
                    + value
                    + '</option>');
        });

    }

//END SCRIPT
});