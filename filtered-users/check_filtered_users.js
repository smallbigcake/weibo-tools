const URL_PROFILE = 'https://weibo.com/ajax/profile/info?uid={__UID__}';
const URL_FILTERED_USERS = 'https://weibo.com/ajax/setting/getFilteredUsers?page={__PAGE__}';
const WAIT_TIME_ERROR = 1000; // ms
const WAIT_TIME_REQUEST = 200; // ms

const HEADER = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,zh-TW;q=0.6',
    'client-version': 'v2.40.44',
    'sec-ch-ua': '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'server-version': 'v2023.04.27.3',
    'x-requested-with': 'XMLHttpRequest',
};

if (typeof cookieStore !== 'undefined') {
    HEADER['cookie'] = get_cookies();
}

async function get_cookies() {
    let cookies = await cookieStore.getAll({});
    let weibo_cookies = [];
    for (let each_cookie of cookies) {
        if (each_cookie.domain === 'weibo.com') {
            weibo_cookies.push(each_cookie.name + '=' + each_cookie.value);
        }
    }
    return weibo_cookies.join('; ');
}


async function get_filtered_users() {

    let users = [];
    let page = 1;
    while (true) {
        let page_result = await get_filtered_user_page(page);
        console.log('Page: ' + page + ' Users: ' + page_result.users.length);
        users.push(...page_result.users);

        if (page_result.next_cursor) {
            page++;
        } else {
            break;
        }
        await wait(WAIT_TIME_REQUEST);
    }
    return users;
}

async function get_filtered_user_page(page) {
    let sleep_time = WAIT_TIME_ERROR;
    while (true) {
        console.log('Calling API... Page: ' + page)
        let url = URL_FILTERED_USERS.replace('{__PAGE__}', page);
        let response = await fetch(url, {
            'headers': HEADER,
            'referrer': 'https://weibo.com/set/shield?type=user',
            'referrerPolicy': 'strict-origin-when-cross-origin',
            'body': null,
            'method': 'GET',
            'mode': 'cors',
            'credentials': 'include'
        });
        let data;
        if (response.ok && response.status === 200) {
            data = await response.json();
            if (data.ok) {
                return {
                    users: data.card_group,
                    next_cursor: data.next_cursor
                };
            } else {
                console.log('Error: ' + data);
                await wait(sleep_time);
            }
        } else {
            console.log('Error: ' + response.status);
            await wait(sleep_time);
        }
        sleep_time *= 2;

    }
}

async function get_profile(uid) {
    let sleep_time = WAIT_TIME_ERROR;
    let url = URL_PROFILE.replace('{__UID__}', uid);
    let data;

    while (true) {
        let response = await fetch(url, {
            'headers': HEADER,
            'referrer': 'https://weibo.com/set/shield?type=user',
            'referrerPolicy': 'strict-origin-when-cross-origin',
            'body': null,
            'method': 'GET',
            'mode': 'cors',
            'credentials': 'include'
        });

        if (response.ok && response.status === 200) {
            data = await response.json();
            if (data.ok) {
                return data.data.user;
            } else {
                console.log('Error: ' + JSON.stringify(data));
                if (data.error_type === 'link' || data.error_type === 'toast') {
                    return {};
                } else {
                    console.log(data);
                    await wait(sleep_time);
                }
            }
        } else {
            console.log('Error: ' + response.status + ' ' + response.statusText + ' ' + response.url);
            await wait(sleep_time);
        }
        sleep_time *= 2;
    }

}

// Write content to a file in Google Chrome
async function write_file(handle, content) {
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
}


async function get_file_handle(filename) {
    return await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{
            description: 'Text file',
            accept: {
                'text/csv': ['.csv'],
            },
        }],
    });
}

async function main() {
    let file_handle = await get_file_handle('filtered-users.csv');
    let users = await get_filtered_users();
    if (users === undefined) {
        console.log('Error: users is undefined.')
        return;
    }
    console.log('Total users: ' + users.length);
    let csv_content = 'UID,Screen Name,Gender,Location,Statuses Count,Followers Count,Friends Count,User Type,Is Star,Is Mute User,Verified,Verified Type,Mbrank,Mbtype,Description,SVIP\n';
    for (let user of users) {
        let url_parts = parse_url(user.scheme);
        let uid = url_parts.uid;
        let screen_name = user.title_sub;
        let profile = await get_profile(uid);
        csv_content += [
            uid,
            screen_name,
            profile.gender,
            profile.location,
            profile.statuses_count,
            profile.followers_count,
            profile.friends_count,
            profile.user_type,
            profile.is_star,
            profile.is_muteuser,
            profile.verified,
            profile.verified_type,
            profile.mbrank,
            profile.mbtype,
            profile.description,
            profile.svip,
            '\n'
        ].join(',');
        console.log('UID: ' + uid + ', Name: ' + screen_name + ', Gender' + profile.gender + ', Location: ' + profile.location + ', Statuses Count: ' + profile.statuses_count + ', Followers Count: ' + profile.followers_count + ', Friends Count: ' + profile.friends_count + ', User Type: ' + profile.user_type + ', Is Star: ' + profile.is_star + ', Is Mute User: ' + profile.is_muteuser + ', Verified: ' + profile.verified + ', Verified Type: ' + profile.verified_type + ', Mbrank: ' + profile.mbrank + ', Mbtype: ' + profile.mbtype + ', Description: ' + profile.description + ', SVIP: ' + profile.svip);
        await wait(WAIT_TIME_REQUEST);

    }

    await write_file(file_handle, csv_content);

}


// Define a function that parse the parameters from the url.
function parse_url(url) {
    let result = {};
    let params = url.split('?')[1].split('&');
    for (let param of params) {
        let [key, value] = param.split('=');
        result[key] = value;
    }
    return result;
}

async function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds)
    })
}


main();