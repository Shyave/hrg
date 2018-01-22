//In the below function
//If the path exists, it will return the path value
//Else it will return undefined

function getPath(obj, path) {

    path = path.toString();
    var arr = path.split('.');

    for (var i = 0; i < arr.length; i++) {
        if (!obj || !obj.hasOwnProperty(arr[i])) {
            return undefined;
        }
        obj = obj[arr[i]];
    }
    
    if (obj)
        return obj;
}

getPath(emp, 'address.locality.street');

