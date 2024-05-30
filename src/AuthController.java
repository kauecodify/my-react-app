@RestController
@RequestMapping("/api/auth")
public class AuthController implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpRequest signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setCpf(signUpRequest.getCpf());

        // Geração de token de autenticação
        String authenticationToken = generateRandomToken();
        user.setAuthenticationToken(authenticationToken);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    @Override
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody UserLoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        // Geração de token de autenticação
        String authenticationToken = generateRandomToken();
        user.setAuthenticationToken(authenticationToken);
        userRepository.save(user);

        // Retorna uma resposta indicando a autenticação bem-sucedida
        return ResponseEntity.ok("User authenticated successfully");
    }

    @Override
    @GetMapping("/checkEmailAvailability")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.ok("Email is already in use");
        } else {
            return ResponseEntity.ok("Email is available");
        }
    }

    // Método para gerar um token de autenticação aleatório de 10 dígitos
    private String generateRandomToken() {
        Random random = new Random();
        int tokenLength = 10;
        StringBuilder token = new StringBuilder();
        for (int i = 0; i < tokenLength; i++) {
            token.append(random.nextInt(10)); // Adiciona um dígito aleatório (0-9) ao token
        }
        return token.toString();
    }
}
