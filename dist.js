// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const urlJoin = function(...args) {
    let input;
    if (typeof args[0] === 'object') {
        input = args[0];
    } else {
        input = [].slice.call(args);
    }
    return normalize(input);
};
const normalize = (strArray)=>{
    const resultArray = [];
    if (strArray.length === 0) {
        return '';
    }
    if (typeof strArray[0] !== 'string') {
        throw new TypeError('Url must be a string. Received ' + strArray[0]);
    }
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
        const first = strArray.shift();
        strArray[0] = first + strArray[0];
    }
    if (strArray[0].match(/^file:\/\/\//)) {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    } else {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    }
    for(let i = 0; i < strArray.length; i++){
        let component = strArray[i];
        if (typeof component !== 'string') {
            throw new TypeError('Url must be a string. Received ' + component);
        }
        if (component === '') {
            continue;
        }
        if (i > 0) {
            component = component.replace(/^[\/]+/, '');
        }
        if (i < strArray.length - 1) {
            component = component.replace(/[\/]+$/, '');
        } else {
            component = component.replace(/[\/]+$/, '/');
        }
        resultArray.push(component);
    }
    let str = resultArray.join('/');
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');
    let parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?' : '') + parts.join('&');
    return str;
};
const methods = [
    'get',
    'post',
    'put',
    'delete',
    'options',
    'head',
    'connect',
    'trace',
    'patch', 
];
const addInterceptor = ()=>{
    const interceptor = {
        list: [],
        use: function(fulfilled, rejected) {
            const id = this.list.length;
            this.list.push({
                fulfilled,
                rejected
            });
            return id;
        },
        eject: function(index) {
            if (this.list[index]) {
                this.list[index] = null;
            }
        }
    };
    return interceptor;
};
function axiod(url, config) {
    if (typeof url === 'string') {
        return axiod.request(Object.assign({}, axiod.defaults, {
            url
        }, config));
    }
    return axiod.request(Object.assign({}, axiod.defaults, url));
}
axiod.defaults = {
    url: '/',
    method: 'get',
    timeout: 0,
    withCredentials: false,
    validateStatus: (status)=>{
        return status >= 200 && status < 300;
    }
};
axiod.create = (config1)=>{
    const instance = axiod.bind({});
    instance.defaults = Object.assign({}, axiod.defaults, config1);
    instance._request = request;
    instance.request = (options)=>{
        return instance._request(Object.assign({}, instance.defaults, options));
    };
    instance.get = (url, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'get'
        }));
    };
    instance.post = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'post',
            data
        }));
    };
    instance.put = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'put',
            data
        }));
    };
    instance.delete = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'delete',
            data
        }));
    };
    instance.options = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'options',
            data
        }));
    };
    instance.head = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'head',
            data
        }));
    };
    instance.connect = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'connect',
            data
        }));
    };
    instance.trace = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'trace',
            data
        }));
    };
    instance.patch = (url, data, config)=>{
        return instance.request(Object.assign({}, {
            url
        }, config, {
            method: 'patch',
            data
        }));
    };
    instance.interceptors = {
        request: addInterceptor(),
        response: addInterceptor()
    };
    instance.interceptors.request.list = [];
    instance.interceptors.response.list = [];
    return instance;
};
async function request(config) {
    if (this.interceptors.request.list.length > 0) {
        for (const interceptor of this.interceptors.request.list){
            if (interceptor) {
                const { fulfilled  } = interceptor;
                if (fulfilled && config) {
                    config = await fulfilled(config);
                }
            }
        }
    }
    let { url ='/' , baseURL , method , headers , params ={} , data , timeout , withCredentials , auth , validateStatus , paramsSerializer , transformRequest , transformResponse , redirect , responseType ='json' ,  } = config;
    if (baseURL) {
        url = urlJoin(baseURL, url);
    }
    if (method) {
        if (methods.indexOf(method.toLowerCase().trim()) === -1) {
            throw new Error(`Method ${method} is not supported`);
        } else {
            method = method.toLowerCase().trim();
        }
    } else {
        method = 'get';
    }
    let _params = '';
    if (params) {
        if (paramsSerializer) {
            _params = paramsSerializer(params);
        } else {
            _params = Object.keys(params).map((key)=>{
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');
        }
    }
    if (withCredentials) {
        if (auth?.username && auth?.password) {
            if (!headers) {
                headers = {};
            }
            headers['Authorization'] = 'Basic ' + btoa(unescape(encodeURIComponent(`${auth.username}:${auth.password}`)));
        }
    }
    const fetchRequestObject = {};
    if (method !== 'get') {
        fetchRequestObject.method = method.toUpperCase();
    }
    if (_params) {
        url = urlJoin(url, `?${_params}`);
    }
    if (data && method !== 'get') {
        if (transformRequest && Array.isArray(transformRequest) && transformRequest.length > 0) {
            for(var i = 0; i < (transformRequest || []).length; i++){
                if (transformRequest && transformRequest[i]) {
                    data = transformRequest[i](data, headers);
                }
            }
        }
        if (typeof data === 'string' || data instanceof FormData || data instanceof URLSearchParams) {
            fetchRequestObject.body = data;
        } else {
            try {
                fetchRequestObject.body = JSON.stringify(data);
                if (!headers) {
                    headers = {};
                }
                headers['Accept'] = 'application/json';
                headers['Content-Type'] = 'application/json';
            } catch (ex) {}
        }
    }
    if (headers) {
        const _headers = new Headers();
        Object.keys(headers).forEach((header)=>{
            if (headers && headers[header]) {
                _headers.set(header, headers[header]);
            }
        });
        fetchRequestObject.headers = _headers;
    }
    const controller = new AbortController();
    fetchRequestObject.signal = controller.signal;
    let timeoutCounter = 0;
    if ((timeout || 0) > 0) {
        timeoutCounter = setTimeout(()=>{
            timeoutCounter = 0;
            controller.abort();
        }, timeout);
    }
    if (redirect) {
        fetchRequestObject.redirect = redirect;
    }
    return fetch(url, fetchRequestObject).then(async (x)=>{
        if (timeoutCounter) {
            clearTimeout(timeoutCounter);
        }
        const _status = x.status;
        const _statusText = x.statusText;
        let _data = null;
        try {
            const response = x.clone();
            if (responseType === 'json') {
                _data = await response.json();
            } else if (responseType === 'text') {
                _data = await response.text();
            } else if (responseType === 'arraybuffer') {
                _data = await response.arrayBuffer();
            } else if (responseType === 'blob') {
                _data = await response.blob();
            } else if (responseType === 'stream') {
                _data = (await response.blob()).stream();
            } else {
                _data = await response.text();
            }
        } catch (ex) {
            _data = await x.clone().text();
        }
        if (transformResponse) {
            if (transformResponse && Array.isArray(transformResponse) && transformResponse.length > 0) {
                for(var i = 0; i < (transformResponse || []).length; i++){
                    if (transformResponse && transformResponse[i]) {
                        _data = transformResponse[i](_data);
                    }
                }
            }
        }
        const _headers = x.headers;
        const _config = {
            url,
            baseURL,
            method,
            headers,
            params,
            data,
            timeout,
            withCredentials,
            auth,
            paramsSerializer,
            redirect,
            responseType
        };
        let isValidStatus = true;
        if (validateStatus) {
            isValidStatus = validateStatus(_status);
        } else {
            isValidStatus = _status >= 200 && _status <= 303;
        }
        let response = null;
        let error = null;
        if (isValidStatus) {
            response = {
                status: _status,
                statusText: _statusText,
                data: _data,
                headers: _headers,
                config: _config
            };
        } else {
            error = {
                response: {
                    status: _status,
                    statusText: _statusText,
                    data: _data,
                    headers: _headers
                },
                config: _config
            };
        }
        if (this.interceptors.response.list.length > 0) {
            for (const interceptor of this.interceptors.response.list){
                if (interceptor) {
                    const { fulfilled , rejected  } = interceptor;
                    if (fulfilled && response) {
                        response = await fulfilled(response);
                    }
                    if (rejected && error) {
                        error = await rejected(error);
                    }
                }
            }
        }
        if (error) {
            return Promise.reject(error);
        }
        return Promise.resolve(response);
    });
}
axiod._request = request;
axiod.request = request;
axiod.get = (url, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'get'
    }));
};
axiod.post = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'post',
        data
    }));
};
axiod.put = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'put',
        data
    }));
};
axiod.delete = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'delete',
        data
    }));
};
axiod.options = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'options',
        data
    }));
};
axiod.head = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'head',
        data
    }));
};
axiod.connect = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'connect',
        data
    }));
};
axiod.trace = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'trace',
        data
    }));
};
axiod.patch = (url, data, config)=>{
    return axiod.request(Object.assign({}, {
        url
    }, config, {
        method: 'patch',
        data
    }));
};
axiod.interceptors = {
    request: addInterceptor(),
    response: addInterceptor()
};
let previous_answer = [];
const fetchRandomWord = async ()=>{
    try {
        const request1 = await axiod.get("https://random-word-api.herokuapp.com/word");
        if (request1?.data[0]) {
            return request1?.data[0].toUpperCase();
        }
        return "HELLO";
    } catch (_e) {
        return "HELLO";
    }
};
let wordleWord = await fetchRandomWord();
const getWord = async ()=>{
    const word = await prompt("Introduce your word");
    if (!word) {
        return {
            error: "Please introduce a word",
            word: ""
        };
    }
    if (word.length !== wordleWord.length) {
        return {
            error: `Your word should be ${wordleWord.length} characters long`,
            word: ""
        };
    }
    if (!/^[a-zA-Z]+$/.test(word)) {
        return {
            error: "Your word should contain only letters",
            word: ""
        };
    }
    return {
        error: null,
        word: word.toUpperCase()
    };
};
const getAnswer = async ()=>{
    const answer = await prompt("Do you wanna play again? [y/n]");
    if (!answer) {
        return {
            error: "Please introduce your answer",
            answer: ""
        };
    }
    if (!/^(y|n|Y|N)$/.test(answer)) {
        return {
            error: "Please answer with y/n",
            answer: ""
        };
    }
    return {
        error: null,
        answer
    };
};
const colorLetter = (letter, index)=>{
    if (wordleWord[index] === letter) {
        return `\x1b[42m ${letter} \x1b[0m`;
    }
    if (wordleWord.includes(letter)) {
        return `\x1b[43m ${letter} \x1b[0m`;
    }
    return `\x1b[1m ${letter} \x1b[0m`;
};
const printGrid = ()=>{
    console.clear();
    for(let i = 0; i < previous_answer.length; i++){
        let row = "";
        [
            ...previous_answer[i]
        ].forEach((letter, index)=>row += " |" + colorLetter(letter, index) + "| ");
        console.log(row);
    }
    for(let i1 = 6 - previous_answer.length; i1 >= 0; i1--){
        let row = "";
        [
            ...wordleWord
        ].forEach(()=>row += " | _ | ");
        console.log(row);
    }
};
const checkStatus = (guess)=>{
    printGrid();
    if (guess === wordleWord) {
        console.log("you did it");
        return true;
    }
    if (previous_answer.length > 6) {
        console.log("out of tries, the word is:", wordleWord);
        return true;
    }
    return false;
};
const main = async ()=>{
    printGrid();
    let guess = "";
    while(guess === ""){
        const { error , word  } = await getWord();
        if (error) {
            console.error(error);
            continue;
        }
        guess = word;
    }
    previous_answer.push(guess);
    const isDone = checkStatus(guess);
    if (!isDone) {
        main();
    } else {
        let isPlayAgain = "";
        while(isPlayAgain === ""){
            const { error , answer  } = await getAnswer();
            if (error) {
                console.error(error);
                continue;
            }
            isPlayAgain = answer;
        }
        if (/^(y|Y)$/.test(isPlayAgain)) {
            previous_answer = [];
            wordleWord = await fetchRandomWord();
            main();
        }
    }
};
main();

