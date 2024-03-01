"use client";

import ScoresheetYams from "@/features/scoresheet/components/ScoresheetYams";
import { Container } from "@radix-ui/themes";
import { motion } from "framer-motion";
import styles from "./page.module.css";

export default function PlayPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={styles.bottom}
    >
      <Container p="2" size="2">
        <ScoresheetYams />
      </Container>
    </motion.div>
  );
}
