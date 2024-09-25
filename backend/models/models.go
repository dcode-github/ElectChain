package models

type UserDetails struct {
	Address  string `json:"address"`
	Name     string `json:"name"`
	Age      string `json:"age"`
	Gender   string `json:"gender"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
