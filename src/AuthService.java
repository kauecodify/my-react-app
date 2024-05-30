public interface AuthService {
    ResponseEntity<?> signUp(UserSignUpRequest signUpRequest);
    ResponseEntity<?> signIn(UserLoginRequest loginRequest);
    ResponseEntity<?> checkEmailAvailability(String email);
}
