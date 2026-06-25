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
            "subscription_id": "com.picsart.studio.subscription_pro_yearly",
            "expire_date": 4092599349000
        }
    ];
} else if (url.indexOf("/guard/users/order") !== -1) {
    obj.response = {
        "tier": {
            "id": "pro",
            "level": 2000,
            "permissions": [
                "premium_tools_standard",
                "premium_tools_ai",
                "premium_tools_basic"
            ],
            "storage_limit_in_mb": 102400,
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
} else if (url.indexOf("/shop/subscription/apple/purchases") !== -1) {
    if (obj.response && obj.response.length > 0) {
        obj.response.forEach(item => {
            item.status = "SUBSCRIPTION_PURCHASED";
            item.expire_date = 4092599349000;
            item.reason = "ok";
            if (item.plan_meta) {
                item.plan_meta.level = 2000;
                item.plan_meta.tier_id = "pro";
                item.plan_meta.permissions = [
                    "premium_tools_standard",
                    "premium_tools_ai"
                ];
            }
        });
    } else {
        obj.response = [
            {
                "status": "SUBSCRIPTION_PURCHASED",
                "is_trial": true,
                "order_id": "70002532791224",
                "expire_date": 4092599349000,
                "purchase_date": 1738631594000,
                "subscription_id": "com.picsart.studio.subscription_pro_yearly",
                "original_order_id": "70001485887509",
                "plan_meta": {
                    "permissions": [
                        "premium_tools_standard",
                        "premium_tools_ai"
                    ],
                    "auto_renew_product_id": "com.picsart.studio.subscription_pro_yearly",
                    "level": 2000,
                    "storage_limit_in_mb": 102400,
                    "id": "com.picsart.studio.subscription_pro_yearly",
                    "frequency": "yearly",
                    "type": "renewable",
                    "scope_id": "full",
                    "product_id": "subscription_pro_yearly",
                    "description": "",
                    "tier_id": "pro"
                },
                "is_eligible_for_introductory": false,
                "reason": "ok"
            }
        ];
    }
}

$done({ body: JSON.stringify(obj) });