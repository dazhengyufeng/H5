import Vue from 'vue'
export default {
  /**
   * 获取cookie  by Nadia
   */
  getCookie: function (key) {
    if (document.cookie.length > 0) {
      var start = document.cookie.indexOf(key + '=')
      if (start !== -1) {
        start = start + key.length + 1
        var end = document.cookie.indexOf(';', start)
        if (end === -1) end = document.cookie.length
        return unescape(document.cookie.substring(start, end))
      }
    }
    return ''
  },
  /**
   * 保存Cookie by Nadia
   * @param c_name
   * @param value
   * @param expiredays
   */
  setCookie: function (cName, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cName + '=' + decodeURIComponent(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  }
}
