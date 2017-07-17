# API Documentation

[/verify/:token][] ### Register new user to the application and send confirmation email to the user.
* **URL**

  /register

* **Method:**

  `POST`

* **Header:**

  ```
  Content-Type: application/json
  ```

*  **URL Params**

	None

* **Data Params**

	```
	{
		"firstName": "",
		"lastName": "",
		"email": "",
		"password": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Successfully registered. An email has been sent to verify your account`

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**

    			```
    			{
    				"error": {
       				 	"code": 400,
        				"message": "Bad request"
    				}
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http POST localhost:8080/api/auth/register firstName=fname lastName=lname email=email@domain.com password=password@123
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
    **Content:** `Successfully verified user account`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    			```
    			{
    				"error": {
        				"code": 401,
        				"message": "The token you provided is invalid"
    				}
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http PATCH localhost:8080/api/auth/verify/akfgaljnguaig
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

	```
	{
		"email": "",
		"password": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    			```
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

    			```
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

    			```
    			{
				    "error": {
				        "code": 403,
				        "message": "Incorrect password"
				    }
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http POST localhost:8080/auth/login email=admin@myapp.com password=admin@123
	```

### Get new access token based on refresh token.

* **URL**

  /refresh

* **Method:**

  `POST`

* **Header:**

  ```
  Content-Type: application/json
  ```

*  **URL Params**

	None

* **Data Params**

	```
	{
		"refreshToken": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    			```
    			{
				    "accessToken": ""
				}
				```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**

    			```
    			{
				    "error": {
				        "code": 404,
				        "message": "Refresh token does not exists"
				    }
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http POST localhost:8080/api/auth/refresh refreshToken=jkgajngkahihf
	```

### Logout from the application.

* **URL**

  /logout

* **Method:**

  `DELETE`

* **Header:**

  ```
  Content-Type: application/json
  Authorization: Bearer <access_token>
  ```

*  **URL Params**

	None

* **Data Params**

	```
	{
		"refreshToken" : ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Successfully logged out from the application`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    			```
    			{
				    "error": {
				        "code": 401,
				        "message": "The token you provided has expired"
				    }
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http DELETE localhost:8080/api/auth/logout Authorization:Bearer-jajnandkl refreshToken=jkgajngkah
	```

### Send reset password link to email.

* **URL**

  /forgotPassword

* **Method:**

  `POST`

* **Header:**

  ```
  Content-Type: application/json
  ```

*  **URL Params**

	None

* **Data Params**

	```
	{
		"email": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Successfully sent reset password link`

* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:**

    			```
    			{
				    "error": {
				        "code": 403,
				        "message": "Incorrect email"
				    }
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http POST localhost:8080/api/auth/forgotPassword email=myemail@domain.com
	```

### Validate the reset password token and on success change the password.

* **URL**

  /resetPassword/:token

* **Method:**

  `POST`

* **Header:**

  ```
  Content-Type: application/json
  ```

*  **URL Params**

	`token=[string]`

* **Data Params**

	```
	{
		"newPassword": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Password reset successfully`

* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    			```
    			{
				    "error": {
				        "code": 500,
				        "message": "Server Error"
				    }
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http POST localhost:8080/api/auth/resetPassword/akfgaljnguaig newPassword=newOne@123
	```

### Change user password.

* **URL**

  /changePassword

* **Method:**

  `PUT`

* **Header:**

  ```
  Content-Type: application/json
  Authorization: Bearer <access_token>
  ```

*  **URL Params**

	None

* **Data Params**

	```
	{
		"email": "",
		"oldPassword": "",
		"newPassword": ""
	}
	```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Password successfully changed`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    			```
    			{
				    "error": {
				        "code": 401,
				        "message": "The token you provided has expired"
				    }
				}
				```

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:**

    			```
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

    			```
    			{
				    "error": {
				        "code": 403,
				        "message": "Incorrect password"
				    }
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http PUT localhost:8080/api/auth/changePassword Authorization:Bearer-jajnandkl email=myemail@domain.com oldPassword=myOldPass newPassword=myNewPass
	```

### Validate if access token is valid or not.

* **URL**

  /validateToken

* **Method:**

  `GET`

* **Header:**

  ```
  Content-Type: application/json
  Authorization: Bearer <access_token>
  ```

*  **URL Params**

	None

* **Data Params**

	None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Valid token`

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    			```
    			{
				    "error": {
				        "code": 401,
				        "message": "The token you provided has expired"
				    }
				}
				```

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**

    			```
    			{
				    "error": {
				        "code": 401,
				        "message": "The token you provided is invalid"
				    }
				}
				```

* **Sample Call**

	* **Using HTTPie**

	```
	http GET localhost:8080/api/auth/validateToken Authorization:Bearer-jajnandkl
	```