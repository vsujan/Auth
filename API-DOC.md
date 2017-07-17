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


### Login to the application and in successful login returns user details with access and refresh token.

* **URL**

  /login

* **Method:**

  `POST`

*  **URL Params**

	None

* **Data Params**

	`{
		"email": "",
		"password": ""
	}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    			`{
				    "user": {
				        "firstName": "",
				        "lastName": "",
				        "email": ""
				    },
				    "role": {
				        "title": "",
				        "name": ""
				    },
				    "tokens": {
				        "accessToken": "",
				        "refreshToken": ""
				    }
				}`

* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:**
    			`{
				    "error": {
				        "code": 403,
				        "message": "Incorrect email"
				    }
				}`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:**
    			`{
				    "error": {
				        "code": 403,
				        "message": "Incorrect password"
				    }
				}`

* **Sample Call**

	``` ```

### Get new access token based on refresh token.

* **URL**

  /refresh

* **Method:**

  `POST`

*  **URL Params**

	None

* **Data Params**

	`{
		"refreshToken": ""
	}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    			`{
				    "accessToken": ""
				}`

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    			`{
				    "error": {
				        "code": 404,
				        "message": "Refresh token does not exists."
				    }
				}`

* **Sample Call**

	``` ```