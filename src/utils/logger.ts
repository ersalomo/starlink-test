import pino from "pino";
import pretty from "pino-pretty"
import moment from "moment"
import path from "path";

export const logger = pino({
    base: {
        pid: false
    },
    timestamp: () => ` [log] : ${moment().format()}`,
    messageKey: 'msg'
}, pretty({
    colorize: true,
    ignore: "pid, hostname, level",
}))
    // .child({ filename: path.basename(__filename) })
