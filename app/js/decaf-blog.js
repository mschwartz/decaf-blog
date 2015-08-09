/**
 * Created by mschwartz on 8/1/15.
 */

/**
 *
 * @param method
 * @param config
 */
function rpc(method, config) {
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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function DelayedTask(fn) {
    this.fn = fn;
    this.handle = null;
}
DelayedTask.prototype.cancel = function() {
    if (this.handle) {
        clearTimeout(this.handle);
        this.handle = null;
    }
    this.data = null;
};
DelayedTask.prototype.defer = function(timeout) {
    var me = this;

    me.data = Array.prototype.slice.call(arguments, 1);
    if (this.handle) {
        clearTimeout(me.handle);
    }
    me.handle = setTimeout(function() {
        me.fn.apply(me, me.data);
        me.handle = null;
    }, timeout);
};

$(document).ready(function() {
    $('.moment').each(function(idx, el) {
        el = $(el);
        console.dir(el.html())
        el.html(moment(parseInt(el.html(), 10) * 1000).calendar());
    });
});
