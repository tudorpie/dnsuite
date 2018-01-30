
var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a variable, just require it
require('bootstrap-sass');
require('../css/app.scss');
// or you can include specific pieces
// require('bootstrap-sass/javascripts/bootstrap/tooltip');
// require('bootstrap-sass/javascripts/bootstrap/popover');


var Q = require('q');

var customAlerts = {
    success : function(type,toggleModal){
        $('.'+type+'-success').slideDown();
        setTimeout(function(){$('.'+type+'-success').slideUp();},3200);

        if(toggleModal) {
            $('.modal-' + type).modal('toggle');
        }


    },
    error:  function(type,result,toggleModal){
        $('.' + type + '-error-msg').text(result.responseJSON.detail);
        $('.' + type + '-error').slideDown();
        setTimeout(function(){$('.' + type + '-error').slideUp();},3200);

        if(toggleModal) {
            $('.modal-' + type).modal('toggle');
        }
    },

}
var domainDns = {
    url: "domain_dns",
    format: ".json",
    domains : [],
    config :  {
        add : '#dom-create',
        del : 'a.dom-del',
        edit: '#dom-edit',
        show: 'a.dom-show',
        preEdit: 'a.dom-pre-edit',
        post_input: $('#dom-name'),
        container: $('.dom-container')
    },
    init: function(){
        var deferred = Q.defer();
        $.ajax(
            {url: this.url  + this.format,
                success: function(result){
                    domainDns.domains = result;
                    deferred.resolve();
                }
            }
        );

        return deferred.promise;
    },
    addElement: function(domainObject){
        var elem =
            '<div class="row" id="dom-row-'+domainObject.id+'">' +
            '<div class="col-xs-6 table-dom-name text-right">'+ domainObject.name + '</div>' +
            '<div class="col-xs-6 text-left">' +

            '<a class="dom-show"  data-id="'+domainObject.id+'" data-name="'+ domainObject.name +'">' +
            '<i class="fa fa-wrench" aria-hidden="true"></i>' +
            '</a>' +

            '<a class="dom-del"  data-id="'+domainObject.id+'" data-name="'+ domainObject.name +'">' +
            '<i class="fa fa-times-circle" aria-hidden="true"></i>' +
            '</a>' +

            '<a class="dom-pre-edit"  data-id="'+domainObject.id+'" data-name="'+ domainObject.name +'">' +
            '<i class="fa fa-edit" aria-hidden="true"></i>' +
            '</a>' +
            '' +
            '</div></div>';
        domainDns.config.container.append(elem);
    },
    show: function (){
        domainDns.domains.forEach(function(dom){
          domainDns.addElement(dom);
        })
    },
    showDetails: function(id){

        domainDns.config.active = id;
        $('.attr-title').text(domainDns.domains[domainDns.find(id)].name);

        $('.table-footer').show();
        $('.table-header').show();
        detailsDns.get(id).then(detailsDns.show);

    },

    add: function(){
        var data = {name :domainDns.config.post_input.val()};
        $.ajax({
            url: domainDns.url + domainDns.format,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(result){
                domainDns.domains.push(result);
                domainDns.addElement(result);

                $('.dom-success').slideDown();
                setTimeout(function(){$('.dom-success').slideUp();},2200);
            },
            error: function(result){
                $('.dom-error-msg').text(result.responseJSON.detail);
                $('.dom-error').slideDown();
                setTimeout(function(){$('.dom-error').slideUp();},2200);
            }
        })
    },

    preEdit: function(id){
       
        var object =  this.domains[this.find(id)];
        $('#dom-edit-name').val(object.name);
        $('#dom-edit').attr('data-id',object.id);
        $('.modal-dom').modal();  
    },
    edit: function(id){
        var index = this.find(id);
        var data = {name: $('#dom-edit-name').val()};

        $.ajax({
            url: domainDns.url + '/' +id,
            method: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(result){

                customAlerts.success('dom',true);

                $('#dom-row-'+id + ' .table-dom-name').html(result.name);
                domainDns.domains[index].name =result.name;
            },
            error: function(result){
                customAlerts.error('dom',true);
            }

        })
    },
    find: function(id){
        var i=0;
        while (id != this.domains[i].id){
            i++;
        }
        return i;
    },
    del: function(id){
        $.ajax({
            url: domainDns.url + '/' + id,
            method: "DELETE",
            success: function(){
                $('#dom-row-'+id).slideUp();
                setTimeout(function(){
                    $('#dom-row-'+id).remove();
                },1200);

                domainDns.domains.splice(domainDns.find(id),1);
                if(domainDns.config.active === id){
                    detailsDns.details = [];
                    $('.details').empty();
                    $('.attr-title').empty();
                    $('.table-header').hide();
                    $('.table-footer').hide();
                }
            },
            error: function(){}
        })
    }

};

var detailsDns = {
    url: "domain_names",
    format: ".json",
    details: [],
    config :  {
        add :       '#det-create',
        del :       '.det-delete',
        preEdit:    '.det-pre-edit',
        edit:       '#det-edit',
        post_input: $('#det-name'),
        container:  $('.det-container')
    },

    init: function(id){

    },


    get: function(id){
        var deferred = Q.defer();
        $.ajax({
            url: detailsDns.url + detailsDns.format + '?domainDns='+id,
            success: function(result){
                detailsDns.details = result;
                deferred.resolve();
            }
        });
        return deferred.promise;
    },
    addEntry: function(det){
        var elem = '<div id="detail-'+ det.id+'" class="list-group-item">' +
            '<div class="col-xs-4 table-det-name">' + det.name+'</div>'+
            '<div class="col-xs-3 table-det-type">' + det.type +'</div>'+
            '<div class="col-xs-3 table-det-value">' + det.value +'</div>'+
            '<div class="col-xs-2">' +
                '<a class="det-pre-edit" data-id="'+ det.id +'"><i class="far fa-edit"></i></a>' +
                '<a class="det-delete" data-id="'+ det.id +'"><i class="fa fa-times-circle"></i></a>' +
            '</div><div class="clearfix"></div></div>';
        $('.details').append(elem);
    },

    find: function(id){
        var i=0;

        while (id != this.details[i].id){
            i++;
        }
        return i;
    },

    show: function(){
        $('.details').empty();

        $('.table-header').slideDown();
        detailsDns.details.forEach(function(det){
            detailsDns.addEntry(det);
        });
        $('.table-footer').slideDown();

    },

    preEdit: function(id){

        $('#det-edit-name').val($('#detail-'+id + ' .table-det-name').html());
        $('#det-edit-type').val( $('#detail-'+id + ' .table-det-type').html());
        $('#det-edit-value').val($('#detail-'+id + ' .table-det-value').html());

        $('#det-edit').attr('data-id',id);
        $('.modal-det').modal();
    },
    
    del: function(id) {
        $.ajax({
            url: detailsDns.url + '/' + id,
            method: 'DELETE',
            success: function (result) {
                $('#detail-' + id).slideUp();
                setTimeout(function () {
                    $('#detail-' + id).remove();
                }, 1200);
                detailsDns.details.splice(detailsDns.find(id),1);
            }
        })
    },
    add: function(){
        var data = {
            name: $('#det-name').val(),
            type: $('#det-type').val(),
            value: $('#det-value').val(),
            domainDns: '/'+domainDns.url+'/'+ domainDns.config.active
        };

        $.ajax({
            url: detailsDns.url +  detailsDns.format,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(result){
                detailsDns.addEntry(result);
                detailsDns.details.push(result);
                customAlerts.success('det');
            },
            error: function(result){
              customAlerts.error('det',result);
            }

        })
    },
    edit: function(id){

        var index = this.find(id);
        var data = {
            name:  $('#det-edit-name').val(),
            type:  $('#det-edit-type').val(),
            value: $('#det-edit-value').val()
        };
        $.ajax({
            url:  detailsDns.url +'/' + id +   detailsDns.format,
            method: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(result){
               customAlerts.success('det',true);

                detailsDns.details[index].name = result.name;
                detailsDns.details[index].type = result.type;
                detailsDns.details[index].value = result.value;

                $('#detail-'+id + ' .table-det-name').html(data.name);
                $('#detail-'+id + ' .table-det-type').html(data.type);
                $('#detail-'+id + ' .table-det-value').html(data.value);

            },
            error: function(result){
                customAlerts.error('det',result,true);
            }

        })
    }


}

$(document).ready(function() {

    domainDns.init().then(domainDns.show);


    $(document).on('click', domainDns.config.add,function(){ domainDns.add($(this).data('id'))});
    $(document).on('click', domainDns.config.del,function(){ domainDns.del($(this).data('id'))});
    $(document).on('click', domainDns.config.edit,function(){ domainDns.edit($(this).data('id'))});
    $(document).on('click', domainDns.config.preEdit,function(){ domainDns.preEdit($(this).data('id'))});
    $(document).on('click', domainDns.config.show,function(){ domainDns.showDetails($(this).data('id'))});



    $(document).on('click', detailsDns.config.add,function(){  detailsDns.add($(this).data('id'))});
    $(document).on('click', detailsDns.config.del,function(){ detailsDns.del($(this).data('id'))});
    $(document).on('click', detailsDns.config.edit,function(){ detailsDns.edit($(this).data('id'))});
    $(document).on('click', detailsDns.config.preEdit,function(){ detailsDns.preEdit($(this).data('id'))});

    var h = window.innerHeight - $('.footer').outerHeight() -1;
    if(h> $('.mega-wrapper').height()){
        $('.mega-wrapper').css('min-height',h);
    }

});

