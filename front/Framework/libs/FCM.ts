const admin = require("firebase-admin");

export class FCM {
    private _options: { priority: string };

    static INITIALIZE(db: string = "https://mallorca-live-recording-1d016.firebaseio.com", serviceAccount: string = "../../mallorca-live-recording-1d016-firebase-adminsdk-94hhu-a03434e7be.json") {
        let _serviceAccount = require(serviceAccount);
        admin.initializeApp({
            credential: admin.credential.cert(_serviceAccount),
            databaseURL: db,
        });
    }

    constructor() {
        this._options = {
            priority: "high",
        };
    }


    public send(registrationToken: string, payload: FCMPayload) {
        admin
            .messaging()
            .sendToDevice(registrationToken, payload.getPayload(), this._options)
            .then(function (response) {
                console.log(response.results);
                console.log("Successfully sent message:", response);
            })
            .catch(function (error) {
                    console.log("Error sending message:", error);
                }
            );
    }
}

export class FCMPayload {
    private payload = {
        notification: {
            title: "",
            body: "",
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            sound: 'default',
            badge: "0",
            screen: 'appointment',
        },
        data: {}
    };

    constructor(title: string, body: string, badge: string = "1", data?: any) {
        this.payload.data = data || {};
        this.payload.notification.title = title;
        this.payload.notification.body = body;
        this.payload.notification.badge = badge;
    }

    getPayload() {
        return this.payload;
    }
}