/**
 * Created by mschwartz on 8/1/15.
 */

function rpc(method, config, callback) {
    var service = method.split('.');

    config = config || {};
    config.method = service[1];

    $.ajax('/rpc/' + service[0] + '.sjs', {
        type     : 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType : 'json',
        data     : JSON.stringify(config),
        success  : function (data, status, xhr) {
            if (config.success) {
                config.success(data);
            }
        },
        error    : function (jqXHR, textStatus, errorThrown) {
            var o = jqXHR.responseJSON;
            if (o && o.exception) {
                console.log(o.exception);
            }
            else {
                console.dir(arguments);
                o = { success : false, message : jqXHR.responseText };
            }
            if (config.failure) {
                config.failure(o);
            }
        }
    });
}
