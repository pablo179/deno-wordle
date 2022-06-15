// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const __default = async (name, cb)=>{
    let fileName = `_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
    let font = await import(`../dist/fonts/${fileName}.js`);
    font = font.default.font;
    if (cb && typeof cb == "function") {
        return cb(font);
    }
    return font;
};
const __default1 = async (ctx, customDict, cb)=>{
    ctx = ctx.split("\n");
    let dictionary = customDict || [
        '!',
        '"',
        '#',
        '$',
        '%',
        '&',
        '\'',
        '(',
        ')',
        '*',
        '+',
        ',',
        '-',
        '.',
        '/',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        ':',
        ';',
        '<',
        '=',
        '>',
        '?',
        '@',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '[',
        '\\',
        ']',
        '^',
        '_',
        '`',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '{',
        '|',
        '}',
        '~',
        'Ä',
        'Ö',
        'Ü',
        'ä',
        'ö',
        'ü',
        'ß'
    ];
    const config = ctx[0].split(" "), blank = config[0].charAt(config[0].length - 1), entry = Number(config[5]), height = Number(config[1]);
    let data = ctx.slice(entry + 1);
    const verify = {
        at: new RegExp(/@/, "g"),
        blank: new RegExp(`\\${blank}`, "g"),
        empty: new RegExp(/\s/, "g")
    };
    let serialized = [];
    data = data.map((x)=>x.replace("@", "").replace(verify.blank, " ")).join('\n').split("@").filter((x)=>{
        return !x.replace(verify.empty, "") == "";
    });
    dictionary.forEach((letter, i)=>{
        serialized.push({
            letter: letter,
            ascii: data[i]
        });
    });
    serialized = serialized.reduce((obj, item)=>Object.assign(obj, {
            [item.letter]: item.ascii
        }), {});
    serialized["©"] = createSpace(height);
    if (cb && typeof cb === "function") return cb(serialized);
    return serialized;
};
const createSpace = (height)=>{
    let result = "";
    for(let i = 0; i < height; i++){
        result += " \n";
    }
    return result;
};
const __default2 = async (string1, dictionary, cb)=>{
    string1 = string1.replace(/\s+/g, '©').split("");
    let initial = [];
    string1.forEach((letter)=>{
        let lines = dictionary[letter].split("\n");
        initial.push(lines);
    });
    let maxLength = 0;
    initial.forEach((letterArr)=>{
        maxLength = letterArr.length > maxLength ? letterArr.length : maxLength;
    });
    let output = [];
    for(let i = 0; i < maxLength; i++){
        output[i] = [];
        for(let j = 0; j < initial.length; j++){
            output[i][j] = typeof initial[j][i] != "undefined" ? initial[j][i] : "";
        }
    }
    let construction = "";
    output.forEach((chain)=>{
        chain.forEach((string)=>{
            construction += string;
        });
        construction += "\n";
    });
    if (cb && typeof cb === "function") return cb(construction);
    return construction;
};
const text = async (string, fontName, preset)=>{
    let font = await __default(fontName);
    let dictionary = await __default1(font, preset);
    return __default2(string, dictionary);
};
const rawStyles = JSON.parse(`{
    "bgColor":{
        "bgBlack":{
            "open":"\\u001b[40m",
            "close":"\\u001b[49m"
        },
        "bgRed":{
            "open":"\\u001b[41m",
            "close":"\\u001b[49m"
        },
        "bgGreen":{
            "open":"\\u001b[42m",
            "close":"\\u001b[49m"
        },
        "bgYellow":{
            "open":"\\u001b[43m",
            "close":"\\u001b[49m"
        },
        "bgBlue":{
            "open":"\\u001b[44m",
            "close":"\\u001b[49m"
        },
        "bgMagenta":{
            "open":"\\u001b[45m",
            "close":"\\u001b[49m"
        },
        "bgCyan":{
            "open":"\\u001b[46m",
            "close":"\\u001b[49m"
        },
        "bgWhite":{
            "open":"\\u001b[47m",
            "close":"\\u001b[49m"
        },
        "bgBlackBright":{
            "open":"\\u001b[100m",
            "close":"\\u001b[49m"
        },
        "bgRedBright":{
            "open":"\\u001b[101m",
            "close":"\\u001b[49m"
        },
        "bgGreenBright":{
            "open":"\\u001b[102m",
            "close":"\\u001b[49m"
        },
        "bgYellowBright":{
            "open":"\\u001b[103m",
            "close":"\\u001b[49m"
        },
        "bgBlueBright":{
            "open":"\\u001b[104m",
            "close":"\\u001b[49m"
        },
        "bgMagentaBright":{
            "open":"\\u001b[105m",
            "close":"\\u001b[49m"
        },
        "bgCyanBright":{
            "open":"\\u001b[106m",
            "close":"\\u001b[49m"
        },
        "bgWhiteBright":{
            "open":"\\u001b[107m",
            "close":"\\u001b[49m"
        },
        "bgGray":{
            "open":"\\u001b[100m",
            "close":"\\u001b[49m"
        },
        "bgGrey":{
            "open":"\\u001b[100m",
            "close":"\\u001b[49m"
        }
    },
    "modifier":{
        "reset":{
            "open":"\\u001b[0m",
            "close":"\\u001b[0m"
        },
        "bold":{
            "open":"\\u001b[1m",
            "close":"\\u001b[22m"
        },
        "dim":{
            "open":"\\u001b[2m",
            "close":"\\u001b[22m"
        },
        "italic":{
            "open":"\\u001b[3m",
            "close":"\\u001b[23m"
        },
        "underline":{
            "open":"\\u001b[4m",
            "close":"\\u001b[24m"
        },
        "inverse":{
            "open":"\\u001b[7m",
            "close":"\\u001b[27m"
        },
        "hidden":{
            "open":"\\u001b[8m",
            "close":"\\u001b[28m"
        },
        "strikethrough":{
            "open":"\\u001b[9m",
            "close":"\\u001b[29m"
        }
    },
    "color":{
        "black":{
            "open":"\\u001b[30m",
            "close":"\\u001b[39m"
        },
        "red":{
            "open":"\\u001b[31m",
            "close":"\\u001b[39m"
        },
        "green":{
            "open":"\\u001b[32m",
            "close":"\\u001b[39m"
        },
        "yellow":{
            "open":"\\u001b[33m",
            "close":"\\u001b[39m"
        },
        "blue":{
            "open":"\\u001b[34m",
            "close":"\\u001b[39m"
        },
        "magenta":{
            "open":"\\u001b[35m",
            "close":"\\u001b[39m"
        },
        "cyan":{
            "open":"\\u001b[36m",
            "close":"\\u001b[39m"
        },
        "white":{
            "open":"\\u001b[37m",
            "close":"\\u001b[39m"
        },
        "blackBright":{
            "open":"\\u001b[90m",
            "close":"\\u001b[39m"
        },
        "redBright":{
            "open":"\\u001b[91m",
            "close":"\\u001b[39m"
        },
        "greenBright":{
            "open":"\\u001b[92m",
            "close":"\\u001b[39m"
        },
        "yellowBright":{
            "open":"\\u001b[93m",
            "close":"\\u001b[39m"
        },
        "blueBright":{
            "open":"\\u001b[94m",
            "close":"\\u001b[39m"
        },
        "magentaBright":{
            "open":"\\u001b[95m",
            "close":"\\u001b[39m"
        },
        "cyanBright":{
            "open":"\\u001b[96m",
            "close":"\\u001b[39m"
        },
        "whiteBright":{
            "open":"\\u001b[97m",
            "close":"\\u001b[39m"
        },
        "gray":{
            "open":"\\u001b[90m",
            "close":"\\u001b[39m"
        },
        "grey":{
            "open":"\\u001b[90m",
            "close":"\\u001b[39m"
        }
    },
    "reset":{
        "open":"\\u001b[0m",
        "close":"\\u001b[0m"
    },
    "bold":{
        "open":"\\u001b[1m",
        "close":"\\u001b[22m"
    },
    "dim":{
        "open":"\\u001b[2m",
        "close":"\\u001b[22m"
    },
    "italic":{
        "open":"\\u001b[3m",
        "close":"\\u001b[23m"
    },
    "underline":{
        "open":"\\u001b[4m",
        "close":"\\u001b[24m"
    },
    "inverse":{
        "open":"\\u001b[7m",
        "close":"\\u001b[27m"
    },
    "hidden":{
        "open":"\\u001b[8m",
        "close":"\\u001b[28m"
    },
    "strikethrough":{
        "open":"\\u001b[9m",
        "close":"\\u001b[29m"
    },
    "black":{
        "open":"\\u001b[30m",
        "close":"\\u001b[39m"
    },
    "red":{
        "open":"\\u001b[31m",
        "close":"\\u001b[39m"
    },
    "green":{
        "open":"\\u001b[32m",
        "close":"\\u001b[39m"
    },
    "yellow":{
        "open":"\\u001b[33m",
        "close":"\\u001b[39m"
    },
    "blue":{
        "open":"\\u001b[34m",
        "close":"\\u001b[39m"
    },
    "magenta":{
        "open":"\\u001b[35m",
        "close":"\\u001b[39m"
    },
    "cyan":{
        "open":"\\u001b[36m",
        "close":"\\u001b[39m"
    },
    "white":{
        "open":"\\u001b[37m",
        "close":"\\u001b[39m"
    },
    "blackBright":{
        "open":"\\u001b[90m",
        "close":"\\u001b[39m"
    },
    "redBright":{
        "open":"\\u001b[91m",
        "close":"\\u001b[39m"
    },
    "greenBright":{
        "open":"\\u001b[92m",
        "close":"\\u001b[39m"
    },
    "yellowBright":{
        "open":"\\u001b[93m",
        "close":"\\u001b[39m"
    },
    "blueBright":{
        "open":"\\u001b[94m",
        "close":"\\u001b[39m"
    },
    "magentaBright":{
        "open":"\\u001b[95m",
        "close":"\\u001b[39m"
    },
    "cyanBright":{
        "open":"\\u001b[96m",
        "close":"\\u001b[39m"
    },
    "whiteBright":{
        "open":"\\u001b[97m",
        "close":"\\u001b[39m"
    },
    "gray":{
        "open":"\\u001b[90m",
        "close":"\\u001b[39m"
    },
    "grey":{
        "open":"\\u001b[90m",
        "close":"\\u001b[39m"
    },
    "bgBlack":{
        "open":"\\u001b[40m",
        "close":"\\u001b[49m"
    },
    "bgRed":{
        "open":"\\u001b[41m",
        "close":"\\u001b[49m"
    },
    "bgGreen":{
        "open":"\\u001b[42m",
        "close":"\\u001b[49m"
    },
    "bgYellow":{
        "open":"\\u001b[43m",
        "close":"\\u001b[49m"
    },
    "bgBlue":{
        "open":"\\u001b[44m",
        "close":"\\u001b[49m"
    },
    "bgMagenta":{
        "open":"\\u001b[45m",
        "close":"\\u001b[49m"
    },
    "bgCyan":{
        "open":"\\u001b[46m",
        "close":"\\u001b[49m"
    },
    "bgWhite":{
        "open":"\\u001b[47m",
        "close":"\\u001b[49m"
    },
    "bgBlackBright":{
        "open":"\\u001b[100m",
        "close":"\\u001b[49m"
    },
    "bgRedBright":{
        "open":"\\u001b[101m",
        "close":"\\u001b[49m"
    },
    "bgGreenBright":{
        "open":"\\u001b[102m",
        "close":"\\u001b[49m"
    },
    "bgYellowBright":{
        "open":"\\u001b[103m",
        "close":"\\u001b[49m"
    },
    "bgBlueBright":{
        "open":"\\u001b[104m",
        "close":"\\u001b[49m"
    },
    "bgMagentaBright":{
        "open":"\\u001b[105m",
        "close":"\\u001b[49m"
    },
    "bgCyanBright":{
        "open":"\\u001b[106m",
        "close":"\\u001b[49m"
    },
    "bgWhiteBright":{
        "open":"\\u001b[107m",
        "close":"\\u001b[49m"
    },
    "bgGray":{
        "open":"\\u001b[100m",
        "close":"\\u001b[49m"
    },
    "bgGrey":{
        "open":"\\u001b[100m",
        "close":"\\u001b[49m"
    }
}`.replace(`\\\\`, `\\`));
const rawCodes = JSON.parse(`[
  [0, 0],
  [1, 22],
  [2, 22],
  [3, 23],
  [4, 24],
  [7, 27],
  [8, 28],
  [9, 29],
  [30, 39],
  [31, 39],
  [32, 39],
  [33, 39],
  [34, 39],
  [35, 39],
  [36, 39],
  [37, 39],
  [90, 39],
  [91, 39],
  [92, 39],
  [93, 39],
  [94, 39],
  [95, 39],
  [96, 39],
  [97, 39],
  [40, 49],
  [41, 49],
  [42, 49],
  [43, 49],
  [44, 49],
  [45, 49],
  [46, 49],
  [47, 49],
  [100, 49],
  [101, 49],
  [102, 49],
  [103, 49],
  [104, 49],
  [105, 49],
  [106, 49],
  [107, 49]
]`);
function setLazyProperty(object, property, get) {
    Object.defineProperty(object, property, {
        get: ()=>{
            const value = get();
            Object.defineProperty(object, property, {
                value,
                enumerable: true,
                configurable: true
            });
            return value;
        },
        enumerable: true,
        configurable: true
    });
}
function assembleStyles() {
    setLazyProperty(rawStyles, "codes", ()=>{
        const codes = new Map();
        return rawCodes.reduce((currentMap, accumulator)=>{
            return currentMap.set(accumulator[0], accumulator[1]);
        }, codes);
    });
    Object.defineProperty(rawStyles, "color", {
        value: rawStyles.color,
        enumerable: false
    });
    Object.defineProperty(rawStyles, "modifier", {
        value: rawStyles.modifier,
        enumerable: false
    });
    Object.defineProperty(rawStyles, "bgColor", {
        value: rawStyles.bgColor,
        enumerable: false
    });
    return rawStyles;
}
const styles = assembleStyles();
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
const wordleTitle = await text("Wordle", "starwars");
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
    console.log(styles.green.open, wordleTitle, styles.green.close);
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

