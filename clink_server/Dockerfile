# Use an official OpenJDK runtime as a parent image
FROM adoptopenjdk/openjdk11

# Set the working directory inside the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY clink/target/clink-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that the application will listen on
EXPOSE 8000

# Define environment variables (if needed)
# ENV ENV_VARIABLE_NAME value

# Run the JAR file
# log파일 추가해야함!
CMD ["java", "-jar", "app.jar", "--spring.config.location=file:/var/property/application.properties"]