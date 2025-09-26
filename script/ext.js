const listExt = [
    "https://raw.githubusercontent.com/buudvh/leech_story_ext/main/plugin.json",
    "https://raw.githubusercontent.com/lovebook98/leech_story_ext/main/plugin.json",
    "https://raw.githubusercontent.com/Darkrai9x/vbook-extensions/master/plugin.json",
    "https://raw.githubusercontent.com/Darkrai9x/vbook-extensions/refs/heads/master/translate.json",
    "https://raw.githubusercontent.com/Darkrai9x/vbook-extensions/refs/heads/master/tts.json",
    "https://raw.githubusercontent.com/Darkrai9x/vbook-extensions/master/chinese_plugin.json",
    "https://raw.githubusercontent.com/nhocconsr/vbook-ext/master/plugin.json",
    "https://raw.githubusercontent.com/hajljnopera/vbook-ext/main/plugin.json",
    "https://raw.githubusercontent.com/hishirooo/vbook-ext/master/plugin.json",
    "https://raw.githubusercontent.com/Moleys/vbook-ext/main/plugin.json",
    "https://raw.githubusercontent.com/dat-bi/ext-vbook/main/plugin.json",
    "https://raw.githubusercontent.com/duongden/vbook/main/plugin.json",
    "https://raw.githubusercontent.com/SoulGodEve9x9/Vbook-ext/Nahona/plugin.json"
];

const listTrans = [
    {
        "name": "Quillbot",
        "url": "https://quillbot.com/translate?sl=zh&tl=vi&tone=auto&text=%s"
    },
    {
        "name": "G.Translate",
        "url": "https://translate.google.com/?sl=zh-CN&tl=vi&text=%s&translate"
    },
    {
        "name": "Mazii",
        "url": "https://mazii.net/vi-VN/search/word/javi/%s"
    },
    {
        "name": "Yandex",
        "url": "https://translate.yandex.com/?source_lang=zh&target_lang=vi&text=%s"
    },
];

let apiTranslateList = [];

const onStartUp = () => {
    showData();
    addEvent();
}

const showTrans = () => {
    let strHtml = "";
    listTrans.forEach((trans, index) => {
        strHtml += `<div class="trans-item">
                                <div class="trans-left" onclick="copyTransName(this, '${trans.name}')">
                                    ${trans.name}
                                    <div class="trans-feedback">Copied Name</div>
                                </div>
                                <div class="trans-right" onclick="copyTransUrl(this, '${trans.url}')">
                                    <div class="trans-feedback">Copied URL</div>
                                </div>
                            </div>`;
    });

    document.getElementById("id-list-translate").innerHTML = strHtml;
}

const showApiTrans = () => {
    let strHtml = "";
    apiTranslateList.forEach((trans, index) => {
        strHtml += `<div class="trans-item">
                                <div class="trans-left" onclick="copyTransName(this, '${trans.name}')">
                                    ${trans.name}
                                    <div class="trans-feedback">Copied Name</div>
                                </div>
                                <div class="trans-right" onclick="copyTransUrl(this, '${trans.url}')">
                                    <div class="trans-feedback">Copied URL</div>
                                </div>
                            </div>`;
    });

    document.getElementById("id-list-api-translate").innerHTML = strHtml;
}

const showExt = () => {
    let strHtml = "";
    let showExtensionInfor = "";
    let tempArr = [];
    listExt.forEach((ext, index) => {
        tempArr = ext.split("/");
        showExtensionInfor = `Creator: ${tempArr[3]} &emsp; Plugin: ${tempArr[tempArr.length - 1]}`;
        strHtml += `<div class="ext-item" data-ext="${ext}"><span></span> ${showExtensionInfor}</div>`
    });

    document.getElementById("id-list-ext").innerHTML = strHtml;
}

const showData = () => {
    showExt();
    showTrans();
    showApiTrans();
}

const addEvent = () => {
    addEventExt();
}

const addEventExt = () => {
    document.querySelectorAll(".ext-item").forEach(item => {
        item.addEventListener("click", async () => {
            const url = item.getAttribute("data-ext");
            try {
                // Reset all ext items
                document.querySelectorAll(".ext-item").forEach(item => {
                    item.classList.remove("copied");
                    item.querySelector("span").textContent = "";
                });

                await navigator.clipboard.writeText(url);
                item.classList.add("copied");
                item.querySelector("span").textContent = "✔Copied";

                setTimeout(() => {
                    item.classList.remove("copied");
                    item.querySelector("span").textContent = "";
                }, 2000);
            } catch (err) {
                alert("Copy thất bại: " + err);
            }
        });
    });

    // File input handling
    document.getElementById('apiFile').addEventListener('change', function (e) {
        const fileName = e.target.files[0] ? e.target.files[0].name : 'Chưa chọn file';
        document.getElementById('fileName').textContent = `📄 ${fileName}`;
    });
}

const copyTransName = async (objThis, name) => {
    try {
        // Reset all feedback
        document.querySelectorAll(".trans-feedback").forEach(feedback => {
            feedback.classList.remove("show");
        });
        document.querySelectorAll(".trans-left, .trans-right").forEach(item => {
            item.classList.remove("copied");
        });

        await navigator.clipboard.writeText(name);

        objThis.classList.add("copied");
        objThis.querySelector(".trans-feedback").classList.add("show");

        setTimeout(() => {
            objThis.classList.remove("copied");
            objThis.querySelector(".trans-feedback").classList.remove("show");
        }, 2000);
    } catch (err) {
        alert("Copy thất bại: " + err);
    }
}

const copyTransUrl = async (objThis, url) => {
    try {
        // Reset all feedback
        document.querySelectorAll(".trans-feedback").forEach(feedback => {
            feedback.classList.remove("show");
        });
        document.querySelectorAll(".trans-left, .trans-right").forEach(item => {
            item.classList.remove("copied");
        });

        await navigator.clipboard.writeText(url);

        objThis.classList.add("copied");
        objThis.querySelector(".trans-feedback").classList.add("show");

        setTimeout(() => {
            objThis.classList.remove("copied");
            objThis.querySelector(".trans-feedback").classList.remove("show");
        }, 2000);
    } catch (err) {
        alert("Copy thất bại: " + err);
    }
}



// Process API file function
const processApiFile = async () => {
    const fileInput = document.getElementById('apiFile');
    const aiModel = document.getElementById('aiModel').value;
    const button = document.getElementById('createButtonText');
    const successMessage = document.getElementById('successMessage');

    if (!fileInput.files[0]) {
        alert('Vui lòng chọn file API trước!');
        return;
    }

    button.innerHTML = '<div class="loading"></div>Đang xử lý...';

    try {
        const file = fileInput.files[0];
        const text = await file.text();
        const apiKeys = text.split('\n').filter(key => key.trim() !== '');

        // Clear existing API translate list
        apiTranslateList = [];

        const aitype = aiModel === 'gemini' ? '0' : '1';
        const modelName = aiModel === 'gemini' ? 'Gemini AI' : 'Groq AI';

        apiKeys.forEach((apiKey, index) => {
            const trimmedKey = apiKey.trim();
            if (trimmedKey) {
                apiTranslateList.push({
                    name: `${modelName} #${index + 1}`,
                    url: `https://buudvh.github.io/translate.github.io/?key=${trimmedKey}&aitype=${aitype}&text=%s`
                });
            }
        });

        // Refresh the API translate display
        showApiTrans();

        button.textContent = '✅ Hoàn thành';
        successMessage.classList.add('show');

        document.getElementById("id-list-api-translate").scrollIntoView({
            behavior: "smooth", // cuộn mượt
            block: "center"     // căn giữa màn hình (có thể là 'start' | 'end' | 'nearest')
        });

        setTimeout(() => {
            button.textContent = '✨ Tạo Link Dịch AI';
            successMessage.classList.remove('show');
        }, 3000);

    } catch (error) {
        alert('Lỗi đọc file: ' + error.message);
        button.textContent = '✨ Tạo Link Dịch AI';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', onStartUp);