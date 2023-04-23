import { LoggerFactory } from "./factory-class";

const logger = LoggerFactory.createLogger();

logger.debug("debug message");
logger.info("info message");
logger.error("error message");
logger.warn("warn message");
