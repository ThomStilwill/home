export function AutoUnsubscribe() {
    return function(constructor) {

        console.log("auto unsubscribe mount")
        const orig = constructor.prototype.ngOnDestroy
        constructor.prototype.ngOnDestroy = function() {
            console.log("unsubscribeing")
            for(const prop in this) {
                const property = this[prop]
                if(typeof property.subscribe === "function") {
                    property.unsubscribe()
                    console.log("unsubscribed")
                }
            }
            orig.apply()
        }
    }
}