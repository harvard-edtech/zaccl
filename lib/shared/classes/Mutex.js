"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import a lib mutex
const async_mutex_1 = require("async-mutex");
/**
 * Asynchronous Mutex object
 * @author Gabe Abrams
 */
class Mutex {
    /**
     * Create a new mutex
     * @author Gabe Abrams
     */
    constructor() {
        this.mutex = new async_mutex_1.Mutex();
    }
    /**
     * Lock the mutex (resolves when the mutex has been acquired)
     * @author Gabe Abrams
     * @return function to call to release the lock
     */
    lock() {
        return __awaiter(this, void 0, void 0, function* () {
            // Lock the mutex and store the unlock function
            return this.mutex.acquire();
        });
    }
}
exports.default = Mutex;
//# sourceMappingURL=Mutex.js.map