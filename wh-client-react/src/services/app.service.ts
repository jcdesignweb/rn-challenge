import { toast } from "materialize-css"

export default class AppService {
    /**
     * Launch a toast notification
     * 
     * @param message 
     */
    static notification(message?: string) {
        toast({
            html: message
        })
        
    }

}