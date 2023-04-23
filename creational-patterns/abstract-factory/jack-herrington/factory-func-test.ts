import { loggerFactory } from "./factory-func";

const logger = loggerFactory();

logger.debug("debug message");
logger.info("info message");
logger.error("error message");
logger.warn("warn message");
