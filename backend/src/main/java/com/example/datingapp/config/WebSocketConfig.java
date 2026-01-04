package com.example.datingapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Autowired
  private JwtChannelInterceptor jwtChannelInterceptor;

  @Autowired
  private com.example.datingapp.security.JwtTokenProvider jwtTokenProvider;

  @Autowired
  private com.example.datingapp.service.UserService userService;

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws-chat")
        .addInterceptors(new com.example.datingapp.security.JwtHandshakeInterceptor(jwtTokenProvider, userService))
        .setAllowedOriginPatterns("*")
        .withSockJS();

    // Keep existing /ws endpoint for backward compatibility if needed, or remove if
    // replaced.
    // User requested specifically to add /ws-chat. I will keep /ws too just in
    // case, or replace it?
    // "WebSocket connection when JWT auth required" -> usually replaces.
    // I will add the new one.
    registry.addEndpoint("/ws")
        .setAllowedOriginPatterns("*")
        .withSockJS();
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.setApplicationDestinationPrefixes("/app");
    registry.enableSimpleBroker("/topic");
  }

  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(jwtChannelInterceptor);
  }
}
