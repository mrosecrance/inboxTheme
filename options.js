// Saves options to chrome.storage
function save_options() {
    var rotateImages = document.getElementById('rotateImages').checked;
    chrome.storage.sync.set({
        rotateImages: rotateImages
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

var interval;

function restore_options() {
    chrome.storage.sync.get({
        rotateImages: true
    }, function (items) {
        document.getElementById('rotateImages').checked = items.rotateImages;
    });

    // if (rotateImages == true) {
    //     interval = setInterval(resetImage, 5000);
    // } else {
    //     clearInterval(interval);
    // }
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
    var storageChange = changes["rotateImages"];
    if (storageChange !== undefined) {
        if (storageChange.newValue == true && storageChange.oldValue == false) {
            interval = setInterval(resetImage, 5000);
        } else {
            clearInterval(interval);
        }
    }

    for (key in changes) {
        var changeVal = changes[key];
        var status = document.getElementById('status2');

        status.textContent = 'Storage key: ' + key + ' in namespace: ' + namespace + 'changed. ' +
            'Old value was: ' + changeVal.oldValue + ',new value is: ' + changeVal.newValue + '.';
    }
});


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
