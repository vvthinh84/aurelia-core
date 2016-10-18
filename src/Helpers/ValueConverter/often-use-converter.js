import numeral from 'numeral';
import moment from 'moment';

export class VietNamDongValueConverter {
    toView(value) {
        return numeral(value).format('(0,0)') + ' ₫';
    }
}
export class MilisecondsValueConverter {
    toView(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        if (hours > 0) {
            return hours + "h" + minutes + "m" + seconds + "s" + milliseconds;
        } else if (minutes > 0) {
            return minutes + "m" + seconds + "s";
        } else {
            return "";
        }

    }

}

export class DecimalValueConverter {
    toView(value) {
        return numeral(value).format('(0,0)');
    }
}

export class DateFormatValueConverter {
    toView(value, format) {
        if (value != null)
            return moment(value).format(format);
        return value;
    }
}



export class jsonValueConverter {
    toView(value) {
        return JSON.stringify(value, null, 4);
    }
}

export class GenderValueConverter {
    toView(str) {
        if (str) {
            if (str == 'F') return "Nữ";
            if (str == 'M') return "Nam";
        } else return "none";
    }
}

export class StatusValueConverter {
    toView(str) {
        if (str) {
            if (str == 'A') return "Actived";
            if (str == 'D') return "Deactived";
        } else return "N/A";
    }
}

export class ConvertToImangeValueConverter {
    toView(obj) {
        if (obj) {
            return 'https://cdn1.vienthonga.vn/image/' + obj.replace('~/Upload', '');
        } else return 'http://www.dominicanajournal.org/wp-content/plugins/special-recent-posts-pro/images/no-thumb.png';
    }
}

export class SortValueConverter {
    toView(array, propertyName, direction) {
        var factor = direction === 'ascending' ? 1 : -1;
        return array.slice(0)
            .sort((a, b) => {
                return (a[propertyName] - b[propertyName]) * factor
            });
    }
}

export class TakeFromToValueConverter {
    toView(array, from, to) {
        var returnArr = []
        if (array instanceof Array && array.length >= 0) {
            return array.slice(from, to);
        }
        return [];
    }
}

export class TakeValueConverter {
    toView(array, count) {
        return array.slice(0, count);
    }
}

export class TolengthValueConverter {
    toView(array) {
        return array.length;
    }
}

export class ObjtoStringValueConverter {
    toView(str) {
        var a = JSON.parse(str);
        // return a.NguoiDaidien;

    }
}