import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features } from "./constants";
import styles from "./styles.module.scss";

const FeaturesSection = () => {
  return (
    <div
      id="features"
      className={`${styles["features"]} px-4 py-10 text-center`}
    >
      <h1 className="text-4xl font-bold mb-4">PDF Tools</h1>
      <p className="text-gray-600 mb-10">
        Use Monica's online PDF tool to better understand the content of your
        file and get some relevant knowledge about the content. Reading can be
        difficult, but with Chat with PDF, understanding information through
        dialogue becomes simple! Whenever you need to grasp the gist of a
        document or translate its content, Monica is here to help make the
        reading process enjoyable.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`${styles["card"]} ${feature.background} text-white`}
          >
            <CardHeader className={styles["card-header"]}>
              <img
                src={feature.icon}
                alt={`${feature.title} icon`}
                className={styles["image"]}
              />
            </CardHeader>
            <CardContent>
              <CardTitle className={styles["card-title"]}>
                {feature.title}
              </CardTitle>
              <CardDescription className={styles["card-description"]}>
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
