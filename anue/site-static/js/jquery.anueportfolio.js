/*!
 * anueportfolio jQuery plugin v0.1
 * http://anue.biz/
 *
 * Copyright 2012, Fabián Ezequiel Gallina
 * Dual licensed under the MIT or GPL Version 3 licenses.
 */
(function($) {
    $.fn.anueportfolio = function(options) {

        var settings = $.extend({
            'interval-timeout': 10000
        }, options);

        $("#portfolio-clients").hide();
        var portfolio = $("#portfolio-clients li:first").clone();
        portfolio = portfolio.wrapInner('<div>').children().unwrap();
        portfolio.attr("id", "portfolio");
        var navigation = $("<ol>").attr("id", "portfolio-navigation");
        var clients = $("#portfolio-clients li");
        var main_client = clients.eq(0);
        var interval_id = null;

        function start_interval() {
            if (!interval_id)
                interval_id = setInterval(
                    show_next_client, settings['interval-timeout']
                );
        };

        function stop_interval() {
            if (interval_id)
                interval_id = clearInterval(interval_id)
        };

        function show_client(id) {
            portfolio.fadeOut("fast", function() {
                var client = $("#" + id);
                if (client.length) {
                    var name = $("h3.client-name", client).html();
                    var description = $("p.client-description", client).html();
                    var logo = $("img.client-logo-image", client).attr("src");
                    var url = $("a.client-logo-link", client).attr("href");
                    $("h3.client-name", portfolio).html(name);
                    $("p.client-description", portfolio).html(description);
                    $("img.client-logo-image", portfolio).attr("src", logo);
                    $("a.client-logo-link", portfolio).attr("href", url);
                    $("a.selected", navigation).removeClass("selected");
                    $("a[href=#" + id + "]").addClass("selected");
                }
                portfolio.fadeIn("fast");
            })
        };

        function show_next_client() {
            var next = $($("a.selected", navigation).attr("href")).next();
            if (!next.length)
                next = main_client;
            show_client(next.attr("id"));
        };

        for (var i=0; i < clients.length; i++) {
            var client = clients[i];
            navigation.append(
                $("<li>").append(
                    $("<a>").attr({
                        "href": "#" + client.id,
                        "title": $("h3", client).html()
                    }).click(
                        (function (id) {
                            return function(e) {
                                e.stopPropagation();
                                show_client(id);
                                return false;
                            }
                        })(client.id)
                    )
                )
            )
        };

        this.mouseenter(stop_interval);
        this.mouseleave(start_interval);
        this.append(navigation);
        this.append(portfolio);
        $("a:first", navigation).addClass("selected");
        start_interval();

    };
})(jQuery)
