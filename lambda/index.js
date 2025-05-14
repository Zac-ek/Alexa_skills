const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola y bienvenido a mi skill.\n Me creo Ángel Zacek Gutiérrez Cruz \n Estudiante de la UTXJ';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PreguntasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PreguntasIntent';
    },
    handle(handlerInput) {
        const preguntaSlot = handlerInput.requestEnvelope.request.intent.slots.pregunta;
        const pregunta = preguntaSlot && preguntaSlot.value ? preguntaSlot.value.toLowerCase() : null;

        console.log(`~~~~ Pregunta recibida: ${pregunta}`);

        if (!pregunta) {
            return handlerInput.responseBuilder
                .speak("Lo siento, no entendí tu pregunta. ¿Puedes repetirla?")
                .reprompt("¿Qué quieres saber?")
                .getResponse();
        }

        let speechText = '';

        switch (pregunta) {
            case 'quien creo la skill':
                speechText = 'Mi nombre es Ángel Zacek Gutiérrez Cruz.';
                break;
            case 'cual es su color favorito':
                speechText = 'Mi color favorito es el Azul.';
                break;
            case 'que carrera estudia':
                speechText = 'Estudio Ingeniería en Desarrollo y Gestion de Software Multiplataforma.';
                break;
            case 'cual es su grupo favorito':
                speechText = 'Mi grupo favorito es Skillet';
                break;
            case 'cual es su cantante favorito':
                speechText = 'Mi cantante favorito es Nsqk';
                break;
            default:
                speechText = 'Lo siento, no tengo una respuesta para eso.';
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('¿Quieres saber otra cosa?')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedes hacerme preguntas personales, como cuál es mi color favorito, grupo musical o carrera. ¿Qué quieres saber?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '¡Hasta luego!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Lo siento, no entiendo eso. Intenta hacerme una pregunta personal.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Sesión terminada: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de activar el intent ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error capturado: ${error.message}`);
        const speakOutput = 'Lo siento, tuve problemas para hacer lo que me pediste. Intenta de nuevo.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PreguntasIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/preguntas-personales/v1.0')
    .lambda();