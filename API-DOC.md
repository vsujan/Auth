# API Documentation

### Register new user to the application and send confirmation email to the user.
* **URL**

  /register

* **Method:**

  `POST`

* **Header:**

  ```bash
  Content-Type: application/json
  ```

*  **URL Params**

	None

* **Data Params**

	```bash
	{
		"firstName": "",
		"lastName": "",
		"email": "",
		"password": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Successfully registered. Verify your account`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:
    			```bash
    			{
    				"error": {
       				 	"code": 400,
        				"message": "Bad request"
    				}
				}
				```

* **Sample Call**

	```bash
	```

### Validate confirmation token sent via email and change user status to active.

* **URL**

  /verify/:token

* **Method:**

  `PATCH`

* **Header:**

  None

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
    			```bash
    			{
    				"error": {
        				"code": 401,
        				"message": "The token you provided is invalid."
    				}
				}
				```

* **Sample Call**

	```bash
	```


### Login to the application and in successful login returns user details with access and refresh token.

* **URL**

  /login

* **Method:**

  `POST`

* **Header:**

  `Content-Type: application/json`

*  **URL Params**

	None

* **Data Params**

	```bash
	{
		"email": "",
		"password": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    			```bash
    			{
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
				}
				```

* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:**
    			```bash
    			{
				    "error": {
				        "code": 403,
				        "message": "Incorrect email"
				    }
				}
				```

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:**
    			```bash
    			{
				    "error": {
				        "code": 403,
				        "message": "Incorrect password"
				    }
				}
				```

* **Sample Call**

	```bash
	```

### Get new access token based on refresh token.

* **URL**

  /refresh

* **Method:**

  `POST`

* **Header:**

  ```bash
  Content-Type: application/json
  ```

*  **URL Params**

	None

* **Data Params**

	```bash
	{
		"refreshToken": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    			```bash
    			{
				    "accessToken": ""
				}
				```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    			```bash
    			{
				    "error": {
				        "code": 404,
				        "message": "Refresh token does not exists."
				    }
				}
				```

* **Sample Call**

	```bash
	```

### Logout from the application.

* **URL**

  /logout

* **Method:**

  `DELETE`

* **Header:**

  ```bash
  Content-Type: application/json
  Authorization: Bearer <access_token>
  ```

*  **URL Params**

	None

* **Data Params**

	`bash
	{
		"refreshToken" : ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Successfully logged out from the application.`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    			```bash
    			{
				    "error": {
				        "code": 401,
				        "message": "The token you provided has expired."
				    }
				}
				```

* **Sample Call**

	```bash
	```