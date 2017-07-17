# API Documentation

### Register new user to the application and send confirmation email to the user.
* **URL**

  /register

* **Method:**

  `POST`

*  **URL Params**

	None

* **Data Params**

	`{
		"firstName": "",
		"lastName": "",
		"email": "",
		"password": ""
	}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Successfully registered. Verify your account`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    			`{
    				"error": {
       				 	"code": 400,
        				"message": "Bad request"
    				}
				}`

* **Sample Call**
	``` ```

### Validate confirmation token sent via email and change user status to active.

* **URL**

  /verify/:token

* **Method:**

  `PATCH`

*  **URL Params**

	`token=[string]`

* **Data Params**

	None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Successfully verified user account.`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    			`{
    				"error": {
        				"code": 401,
        				"message": "The token you provided is invalid."
    				}
				}`

* **Sample Call**
	``` ```