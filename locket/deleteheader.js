const version = 'V1.0.2';

function setHeaderValue(headers, key, value) {
    const lowerKey = key.toLowerCase();
    if (lowerKey in headers) {
        headers[lowerKey] = value;
    } else {
        headers[key] = value;
    }
}

var modifiedHeaders = $request.headers;

setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

setHeaderValue(modifiedHeaders, "X-Device-Country", "US");
setHeaderValue(modifiedHeaders, "X-Subscriber-Country", "US");
setHeaderValue(modifiedHeaders, "X-Apple-Locale", "en_US");

$done({headers: modifiedHeaders});
