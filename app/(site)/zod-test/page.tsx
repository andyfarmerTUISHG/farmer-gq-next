import { env } from "@/app/(site)/env";

export default function page() {
  return (
    <div>
      Hello from Zod
      {" "}
      <br />
      {env.NODE_ENV}
      <br />
      {env.TEST_ANDY}
      <br />
      from config -
      {" "}
      {env.TEST_ANDY}
    </div>
  );
}
