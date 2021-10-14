
$(document).ready(function () {
    $('#contact_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                first_name: {
                    validators: {
                        stringLength: {
                            min: 2,
                        },
                        notEmpty: {
                            message: 'Please supply your first name'
                        }
                    }
                },
                last_name: {
                    validators: {
                        stringLength: {
                            min: 2,
                        },
                        notEmpty: {
                            message: 'Please supply your last name'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your email address'
                        },
                        emailAddress: {
                            message: 'Please supply a valid email address'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your phone number'
                        },
                        phone: {
                            country: 'US',
                            message: 'Please supply a vaild phone number with area code'
                        }
                    }
                },
                address: {
                    validators: {
                        stringLength: {
                            min: 8,
                        },
                        notEmpty: {
                            message: 'Please supply your street address'
                        }
                    }
                },
                city: {
                    validators: {
                        stringLength: {
                            min: 4,
                        },
                        notEmpty: {
                            message: 'Please supply your city'
                        }
                    }
                },
                state: {
                    validators: {
                        notEmpty: {
                            message: 'Please select your state'
                        }
                    }
                },
                zip: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your zip code'
                        },
                        zipCode: {
                            country: 'US',
                            message: 'Please supply a vaild zip code'
                        }
                    }
                },
                message: {
                    validators: {
                        stringLength: {
                            min: 10,
                            max: 255,
                            message: 'Please enter at least 10 characters and no more than 255'
                        },
                        notEmpty: {
                            message: 'Please leave us a message'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function (e) {
            $('#success_message').slideDown({
                opacity: "show"
            }, "slow") // Do something ...
            var form = $('#contact_form');
            if (isMobile) {
                form.removeClass('fade-in');
                form.addClass('fade-out');
                form.hide();
            }
            form.data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function (result) {
                if (result) {
                    form.trigger('reset');
                    
                    wait(2000).then(() => {
                        $('#success_message').addClass('fade-out');
                        wait(2000).then(() => {
                            if (isMobile) {
                                form.removeClass('fade-out');
                                form.show();
                                form.addClass('fade-in');
                            }
                            $('#success_message').hide();
                            $('#success_message').removeClass('fade-out');
                        });
                    });
                }
            }, 'json');
        });
});