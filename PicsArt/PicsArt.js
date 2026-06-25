const url = $request.url;
let obj = JSON.parse($response.body);

if (url.indexOf("/users/show/me.json") !== -1) {
    obj.permissions = [
        "premium_tools_standard",
        "premium_tools_ai",
        "premium_tools_basic"
    ];
    obj.shop_subscriptions = [
        {
            "status": "SUBSCRIPTION_PURCHASED",
            "order_id": "490001314520000",
            "original_order_id": "490001314520000",
            "is_trial": true,
            "subscription_id": "com.picsart.editor.subscription_yearly",
            "is_eligible_for_introductory": false,
            "purchase_date": 1687020148000,
            "expire_date": 4092599349000
        }
    ];
} else if (url.indexOf("/guard/users/order") !== -1) {
    obj.response = {
        "tier": {
            "id": "gold",
            "level": 2000,
            "permissions": [
                "premium_tools_standard",
                "premium_tools_ai",
                "premium_tools_basic"
            ],
            "storage_limit_in_mb": 20480,
            "device_limit": 99
        },
        "additionalInfo": {
            "scopesTrialEligibility": [
                {
                    "scopeId": "mobile_pro_trial",
                    "canUseTrial": false
                },
                {
                    "scopeId": "mobile_web_pro_packages",
                    "canUseTrial": false
                }
            ]
        }
    };
}

$done({ body: JSON.stringify(obj) });