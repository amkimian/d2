// Copyright 2011 Google Inc. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

package d2

import (
	"fmt"
	"net/http"

	"appengine"
	"appengine/user"
)

func init() {
	http.HandleFunc("/app/test", handle)
}

func handle(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	u := user.Current(c)
	if u == nil {
		url, err := user.LoginURL(c, "/index.html")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Fprintf(w, "{ \"error\" : \"%v\" }", url)
		//w.Header().Set("Location", url)
		//w.WriteHeader(http.StatusFound)
		return
	}
	fmt.Fprintf(w, "{ \"user\" : \"%v\" }", u)
}
