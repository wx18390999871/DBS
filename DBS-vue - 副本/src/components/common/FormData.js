var FormData =  function formData(form) {
        form = $(form);
        if (form.length !== 1) return false;

        // Form data
        var formData = {};

        // Skip input types
        var skipTypes = ['submit', 'image', 'button', 'file'];
        var skipNames = [];
        form.find('input, select, textarea').each(function() {
            var input = $(this);
            var name = input.attr('name');
            var type = input.attr('type');
            var tag = this.nodeName.toLowerCase();
            if (skipTypes.indexOf(type) >= 0) return;
            if (skipNames.indexOf(name) >= 0 || !name) return;
            if (tag === 'select') {
                skipNames.push(name);
                formData[name] = [];
                if (input.prop('multiple')) { // 多选
                    form.find('select[name="' + name + '"] option').each(function() {
                        if (this.selected) formData[name].push(this.value);
                    });
                } else { // 单选
                    form.find('select[name="' + name + '"]').each(function() {
                        formData[name].push($(this).val());
                    });
                }

                if (formData[name].length == 1) {
                    formData[name] = formData[name][0];
                }
            } else if (tag === 'textarea') {
                skipNames.push(name);
                formData[name] = [];
                form.find('textarea[name="' + name + '"]').each(function() {
                    formData[name].push(this.value);
                });
                if (formData[name].length == 1) {
                    formData[name]= formData[name][0];
                }
            } else {
                switch (type) {
                    case 'checkbox':
                        skipNames.push(name);
                        formData[name] = [];
                        form.find('input[name="' + name + '"]').each(function() {
                            if (this.checked) {
                                formData[name].push(this.value);
                            } else {
                                formData[name].push(0);
                            }
                        });
                        if (formData[name].length == 1) {
                            formData[name] = formData[name][0];
                        }
                        break;
                    case 'radio':
                        skipNames.push(name);
                        form.find('input[name="' + name + '"]').each(function() {
                            if (this.checked) formData[name] = this.value;
                        });
                        if (formData[name].length == 1) {
                            formData[name] = formData[name][0];
                        }
                        break;
                    default:
                        skipNames.push(name);
                        formData[name] = [];
                        form.find('input[name="' + name + '"]').each(function() {
                            formData[name].push(this.value);
                        });
                        if (formData[name].length == 1) {
                            formData[name] = formData[name][0];
                        }
                        break;
                }
            }

        });

        return formData;
};

export default FormData;