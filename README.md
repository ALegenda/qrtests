# qrtests

How to use :
  1) Check receipt :
    https://qrtests.herokuapp.com/receipts/check? + string from QR Code
  2) Get info from receipt :
    2.1) Get info without registration
      https://qrtests.herokuapp.com/receipts/get? + string from QR Code
    2.2) Get info with login
      https://qrtests.herokuapp.com/receipts/get? + string from QR Code
      As you see, same requset, but you should add header "token", like "token" : "test"
  3) Get history of current user:
    https://qrtests.herokuapp.com/api/gethisory
    You should add header "token", like "token" : "test". Then you will recive JArray with all history
