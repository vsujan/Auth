# API Documentation

## Register new user to the application and send confirmation email to the user.
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
    **Content:** `Successfully registered. Verify you account`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    			`{
    				"error": {
       				 	"code": 400,
        				"message": "Bad request"
    				}
				}`