/* 
 * parseSrt function
 * JavaScript SRT parser
 */
var parseSrt = function (data) {
    var srt = data.replace(/\r+/g, ''); // remove dos newlines
    srt = srt.replace(/^\s+|\s+$/g, ''); // trim white space start and end
    srt = srt.replace(/<[a-zA-Z\/][^>]*>/g, ''); // remove all html tags for security reasons

    // get captions
    var captions = [];
    var caplist = srt.split('\n\n');
    for (var i = 0; i < caplist.length; i = i + 1) {
        var caption = "";
        var content, start, end, s;
        caption = caplist[i];
        s = caption.split(/\n/);
        if (s[0].match(/^\d+$/) && s[1].match(/\d+:\d+:\d+/)) {
            // ignore caption number in s[0]
            // parse time string
            var m = s[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);
            if (m) {
                start = (parseInt(m[1], 10) * 60 * 60) + (parseInt(m[2], 10) * 60) + (parseInt(m[3], 10)) + (parseInt(m[4], 10) / 1000);
                end = (parseInt(m[5], 10) * 60 * 60) + (parseInt(m[6], 10) * 60) + (parseInt(m[7], 10)) + (parseInt(m[8], 10) / 1000);
            } else {
                // Unrecognized timestring
                continue;
            }
            // concatenate text lines to html text
            content = s.slice(2).join("<br>");
        } else {
            // file format error or comment lines
            continue;
        }
        captions.push({
            start: start,
            end: end,
            content: content
        });
    }

    return captions;
};