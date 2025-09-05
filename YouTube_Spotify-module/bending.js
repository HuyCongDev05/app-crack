/*************************************
[rewrite_local]
^https?:\/\/.*\.oracle\.bendingspoonsapps\.com\/v\d\/(users\/.+|purchases\/verify) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/bending.js

[mitm]
hostname = *.oracle.bendingspoonsapps.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];

const list = {
    'CLIME': { id: "com.apalonapps.radarfree.01y_CLIME00001_d50" }, //CLIME-Dự báo thời tiết
    'SpeakTranslate': { id: "com.speakandtranslate.premium.69_99.yearly.7dtrial.groupa" }, //SpeakTranslate-Nói & Dịch - Người dịch
    'splice': { id: "com.path36.SpliceFree.1y_t150_bundle" }, //Splice-Chỉnh sửa video
    'filmicpro': { id: "com.cinegenix.filmic.pro.1y_t130_bundle_creator" }, //Filmicpro-Máy ảnh chuyên nghiệp
    'firstlight': { id: "com.filmicpro.firstlight.1y_t130_bundle_creator" }, //Firstlight-Ứng dụng Ảnh
    'doubletake': { id: "com.filmicpro.doubletake.1w_t20_bundle_creator" }, //Doubletake
    'focos': { id: "com.focos.1y_t130_bundle_creator" }, //Focos-Máy ảnh SLR
    'remini': { id: "com.bigwinepot.nwdn.international.1y_p99_99_ft_pro" }, //Remini-Chỉnh sửa ảnh AI
    'focoslive': { id: "com.focoslive.1y_t130_adj" }, //Focos live-Công cụ chỉnh sửa video
    'thirtydayfitness': { id: "com.vigorapps.30DayFitness.1y_t130_bundle_adj" }, //30 Day Fitness-30 bài tập giảm cân
    'sleep': { id: "com.bendingspoonsapps.SleepHelp.1y_t100_bundle_adj" }, //Sleep-Trợ lý giấc ngủ
    'yoga': { id: "com.flyingnayeem.yoga.1y_t100_1w_bundle_adj" } //Yoga-Thiền Yoga
};

for (const key in list) {
    if (new RegExp(`^${key}`, `i`).test(ua)) {
        chxm1023["me"]["active_subscriptions_ids"] = [list[key].id];
        chxm1023["me"]["active_bundle_subscriptions"] = [{
            "expiry": "2099-09-09T09:09:09+00:00",
            "product_id": list[key].id,
            "features": ["unlock"]
        }];
        chxm1023["settings"]["__identity__"]["expiration"] = "2099-09-09T09:09:09+00:00";
        break;
    }
}

$done({ body: JSON.stringify(chxm1023) });