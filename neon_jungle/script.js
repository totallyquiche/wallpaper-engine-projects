dayjs.extend(window.dayjs_plugin_advancedFormat);

let app = {
    element: document.getElementById('app'),
    date: dayjs(),
    fontSize: 14,
    timeWidget: {
        element: null,
    },
    dateWidget: {
        element: null,
    },
    functions: {
        drawWidgets: null,
        updateTimeProperties: null,
        updateDateProperties: null
    }
}

app.functions.drawWidgets = function () {
    app.date = dayjs();

    // Add time widget element
    if (!app.timeWidget.element) {
        app.timeWidget.element = document.createElement('section');
        app.timeWidget.element.classList.add('widget');
        app.element.append(app.timeWidget.element);
    }

    // Add date widget element
    if (!app.dateWidget.element) {
        app.dateWidget.element = document.createElement('section');
        app.dateWidget.element.classList.add('widget');
        app.element.append(app.dateWidget.element);
    }

    // Update time and date
    app.timeWidget.element.innerText = app.date.format('h:mm a');
    app.dateWidget.element.innerText = app.date.format('ddd MMM Do');
}

app.functions.updateTimeProperties = function(properties) {
    if (properties.show_time) {
        app.timeWidget.element.style.display = properties.show_time.value ? 'block' : 'none';
    }

    if (properties.time_font_color) {
        app.timeWidget.element.style.color = app.functions.convertColorStringToRgbStyle(properties.time_font_color.value);
    }

    if (properties.time_font_scale) {
        app.timeWidget.element.style.fontSize = (properties.time_font_scale.value * app.fontSize) + 'pt';
    }

    if (properties.time_date_glow_brightness) {
        let brightness = (properties.time_date_glow_brightness.value * 5);
        let color = app.timeWidget.element.style.color;

        app.timeWidget.element.style.textShadow = '0px 0px ' + brightness + 'px ' + color;
    }
}

app.functions.updateDateProperties = function(properties) {
    if (properties.show_date) {
        app.dateWidget.element.style.display = properties.show_date.value ? 'block' : 'none';
    }

    if (properties.date_font_color) {
        app.dateWidget.element.style.color = app.functions.convertColorStringToRgbStyle(properties.date_font_color.value);
    }

    if (properties.date_font_scale) {
        app.dateWidget.element.style.fontSize = (properties.date_font_scale.value * app.fontSize) + 'pt';
    }

    if (properties.time_date_glow_brightness) {
        let brightness = (properties.time_date_glow_brightness.value * 5);
        let color = app.dateWidget.element.style.color;

        app.dateWidget.element.style.textShadow = '0px 0px ' + brightness + 'px ' + color;
    }
}

app.functions.updateAppPosition = function (properties) {
    if (properties.time_date_position_top) {
        app.element.style.marginTop = properties.time_date_position_top.value + '%';
    }

    if (properties.time_date_position_right) {
        app.element.style.marginRight = properties.time_date_position_right.value + '%';
    }
}

app.functions.convertColorStringToRgbStyle = function (colorString) {
    let colors = colorString.split(' ').map(function (color) {
        return Math.ceil(color * 255);
    });

    return 'rgb(' + colors + ')';
}

app.functions.init = function () {
    app.element.style.fontSize = app.fontSize;

    app.functions.drawWidgets();

    setInterval(app.functions.drawWidgets, 1000);
}

app.functions.init();

window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        app.functions.updateAppPosition(properties);
        app.functions.updateTimeProperties(properties);
        app.functions.updateDateProperties(properties);
    }
}